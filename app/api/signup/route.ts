import { authPromise } from "../../lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const auth = await authPromise;

    const result = await auth.api.signUpEmail({
      body: {
        name: body.name || "Usuário",
        email: body.email,
        password: body.password,
      },
    });

    return Response.json(result);
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return Response.json({ error: "Erro ao criar conta" }, { status: 500 });
  }
}
