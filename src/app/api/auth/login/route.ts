export async function POST(request: Request) {
  await request.json();

  // Placeholder até a API de autenticação com cookie httpOnly estar disponível.
  return Response.json({ message: "Credenciais inválidas." }, { status: 401 });
}
