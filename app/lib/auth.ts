import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./db/client";

async function initAuth() {
  const client = await clientPromise;
  const db = client.db();

  const auth = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    emailAndPassword: {
      enabled: true,
    },
    callbacks: {
      async onSignIn(user: any) {
        console.log("Usuário fez login:", user.email);
        return true;
      },
      async onSignUp(user: any) {
        console.log("Novo usuário criado:", user.email);
      },
    },
  });

  return auth;
}

export const authPromise = initAuth();

// ✅ AQUI: chamamos auth.handler(request)
export async function GET(request: Request) {
  const auth = await authPromise;
  return auth.handler(request);
}

export async function POST(request: Request) {
  const auth = await authPromise;
  return auth.handler(request);
}
