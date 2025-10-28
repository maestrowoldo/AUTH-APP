import { authPromise } from "../../lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const auth = await authPromise;

    const result = await auth.api.signInEmail({
      body: {
        email: body.email,
        password: body.password,
      },
    });

    return Response.json(result);
  } catch (error) {
    console.error("Erro no login:", error);
    return Response.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}

