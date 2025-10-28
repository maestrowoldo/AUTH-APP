import { authPromise } from "../lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

export default async function Dashboard() {
  // 1️⃣ Obtém a instância do auth
  const auth = await authPromise;

  // 2️⃣ Busca a sessão no servidor
  const sessionResult = await auth.api.getSession({
    headers: new Headers(),
  });

  const session = sessionResult?.session;

  // 3️⃣ Se não houver sessão, redireciona para login
  if (!session) {
    redirect("/");
  }

  const user = sessionResult?.user;

  // 4️⃣ Renderiza o dashboard
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Bem-vindo!
        </h1>
        {user.image && (
          <img
            src={user.image}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
          />
        )}
        <p className="text-gray-700 mb-2 text-lg">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-700 mb-6 text-lg">
          <span className="font-semibold">Nome:</span>{" "}
          {user.name || "Não fornecido"}
        </p>

        <LogoutButton />
      </div>
    </main>
  );
}
