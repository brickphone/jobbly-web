import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.WAITLIST_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.WAITLIST_SUPABASE_ANON_KEY;

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const ALLOWED_SOURCES = new Set(["web", "android-hero"]);

// Per-instance and therefore only a speed bump — serverless spreads requests
// across lambdas. The unique index is what actually keeps the table clean;
// this just trims obvious flooding from a single client.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const recentHits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recentHits.get(key) ?? []).filter((at) => now - at < RATE_WINDOW_MS);
  hits.push(now);
  recentHits.set(key, hits);
  return hits.length > RATE_MAX;
}

// Deliberately uniform: a caller can't tell a new signup from an existing one,
// so the endpoint can't be used to test whether an address is on the list.
const accepted = NextResponse.json({ ok: true });

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("[waitlist] missing WAITLIST_SUPABASE_URL or WAITLIST_SUPABASE_ANON_KEY");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  let body: { email?: unknown; source?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (typeof body.company === "string" && body.company.trim() !== "") return accepted;

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const source = ALLOWED_SOURCES.has(String(body.source)) ? String(body.source) : "web";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, source }),
  });

  // 409 is the unique index rejecting an address that's already signed up.
  // That's a success from the visitor's point of view.
  if (response.ok || response.status === 409) return accepted;

  console.error("[waitlist] insert failed", response.status, await response.text());
  return NextResponse.json({ ok: false, error: "failed" }, { status: 502 });
}
