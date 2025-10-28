// app/page.tsx
import AuthForm from "./components/AuthForm";
import { authPromise } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const auth = await authPromise;

  // Busca a sessão no servidor
  const sessionResult = await auth.api.getSession({
    headers: new Headers(),
  });

  const session = sessionResult?.session;

  // Se o usuário já estiver logado, redireciona
  if (session) {
    redirect("/dashboard");
  }

  // Caso contrário, mostra o formulário
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <AuthForm />
    </main>
  );
}
