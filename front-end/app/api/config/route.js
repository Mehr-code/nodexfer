export async function GET() {
  return new Response(
    JSON.stringify({
      host: process.env.NEXT_PUBLIC_API_HOST,
      port: process.env.NEXT_PUBLIC_API_PORT,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
