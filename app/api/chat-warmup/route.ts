const HEALTH_API_URL = "https://5xjcnnspdh.execute-api.ap-south-1.amazonaws.com/health";
export const runtime = "nodejs";
// Fired as soon as the chat widget opens, well before the visitor finishes
// the registration gate. The chat Lambda has a slow cold start (loading the
// embedding model), which can otherwise exceed API Gateway's ~29s timeout
// and 503 on the visitor's first real message. This gives it a head start.
export async function GET() {
  try {
    await fetch(HEALTH_API_URL, { method: "GET" });
  } catch {
    // Best-effort only — a failed warm-up just means the first real request
    // pays the cold-start cost instead. Never surface this to the visitor.
  }
  return new Response(null, { status: 204 });
}
