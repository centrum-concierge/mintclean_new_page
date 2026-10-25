import { headers } from "next/headers";

// Vercel sets these from the visitor's IP at the edge. They're absent in local
// dev and on non-Vercel hosts, in which case both come back null.
export async function GET() {
  const headerList = await headers();
  return Response.json(
    {
      country: headerList.get("x-vercel-ip-country"),
      region: headerList.get("x-vercel-ip-country-region"),
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
