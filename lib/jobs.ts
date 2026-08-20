const JOBS_ENDPOINT = "https://jobbly-backend-6yl1.onrender.com/api/jobs?limit=1";

// Deliberately conservative: used only if the API is unreachable at build time,
// and low enough that the claim stays true even on a thin day.
const FALLBACK_TOTAL = 30_000;

export async function fetchJobCount(): Promise<number> {
  try {
    const response = await fetch(JOBS_ENDPOINT, { next: { revalidate: 3600 } });
    if (!response.ok) return FALLBACK_TOTAL;
    const total = Number((await response.json())?.total);
    return Number.isFinite(total) && total > 0 ? total : FALLBACK_TOTAL;
  } catch {
    return FALLBACK_TOTAL;
  }
}

// Rounded down to the nearest thousand so "38 000+" stays honest between revalidations.
export function formatJobCount(total: number): string {
  return (Math.floor(total / 1000) * 1000).toLocaleString("sv-SE");
}
