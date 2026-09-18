import { handleContact } from "../../../lib/contact";
export const runtime = "nodejs";
export async function POST(request) {
  return handleContact(request);
}
