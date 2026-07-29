export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {

    return Response.json(
      { error: "Falta el id." },
      { status: 400 }
    );

  }

  /*const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";*/

  const qrUrl =
  `${process.env.NEXT_PUBLIC_APP_URL}/api/queSigue/export/${id}`;

  return Response.json({
    url: `${qrUrl}/api/queSigue/viewer/${id}`,
  });

}