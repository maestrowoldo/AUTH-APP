// app/components/LogoutButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Chama a rota do backend para encerrar a sessão
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/"); // Redireciona para a tela de login
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-medium"
    >
      Logout
    </button>
  );
}
