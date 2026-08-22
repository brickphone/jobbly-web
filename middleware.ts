import { NextRequest, NextResponse } from "next/server";

// Swedish path -> English equivalent.
const TO_ENGLISH: Record<string, string> = {
  "/": "/en",
  "/arbetsgivare": "/en/employers",
  "/support": "/en/support",
};

// Crawlers must not be redirected: Googlebot crawls from the US, and bouncing
// it to /en would get the English pages indexed as the canonical Swedish ones.
const BOT = /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|whatsapp|telegram|discord|preview/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const english = TO_ENGLISH[pathname];
  if (!english) return NextResponse.next();

  // An explicit choice always wins, on this visit and every later one.
  if (request.cookies.get("lang")) return NextResponse.next();

  if (BOT.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();

  // Vercel supplies this in production. Absent locally, and absent means unknown
  // — and unknown falls through to Swedish rather than guessing.
  const country = request.headers.get("x-vercel-ip-country");
  if (!country || country === "SE") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = english;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Only the Swedish pages need checking; skip assets, the API and /en entirely.
  matcher: ["/", "/arbetsgivare", "/support"],
};
