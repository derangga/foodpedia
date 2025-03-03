export default function responseBuilder(
  body: Object = { message: "ok" },
  status: number = 200,
  headers: HeadersInit = { "Content-Type": "application/json" }
): Response {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: headers,
  });
}
