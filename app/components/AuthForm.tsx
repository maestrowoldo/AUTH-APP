"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema, SignUpSchema } from "../lib/validations";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const currentSchema = isSignUp ? SignUpSchema : LoginSchema;
  type CurrentForm = z.infer<typeof currentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CurrentForm>({
    resolver: zodResolver(currentSchema),
  });

  const onSubmit = async (data: CurrentForm) => {
    setError("");
    setLoading(true);
    try {
      const endpoint = isSignUp ? "/api/signup" : "/api/signin";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError("");
    reset();
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {isSignUp ? "Criar Conta" : "Fazer Login"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo Nome – só aparece no cadastro */}
        {isSignUp && (
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              {...register("name" as any)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {(errors as any).name && (
              <p className="text-red-500 text-sm mt-1">
                {(errors as any).name.message}
              </p>
            )}
          </div>
        )}

        {/* Campo Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Campo Senha */}
        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Exibe erro de servidor */}
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}

        {/* Botão de envio */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Carregando..." : isSignUp ? "Criar Conta" : "Entrar"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm">
        {isSignUp ? "Já tem conta?" : "Não tem conta?"}
        <button
          onClick={toggleForm}
          className="text-blue-600 hover:underline ml-1 font-medium"
        >
          {isSignUp ? "Fazer login" : "Criar uma"}
        </button>
      </p>
    </div>
  );

}
