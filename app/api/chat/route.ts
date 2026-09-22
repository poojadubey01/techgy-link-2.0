const CHAT_API_URL = "https://5xjcnnspdh.execute-api.ap-south-1.amazonaws.com/chat";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const body = await request.text();
  const upstream = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const data = await upstream.text();
  return new Response(data, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
