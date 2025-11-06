🔐 Auth App – Sistema de Autenticação com Next.js, TypeScript e Better Auth

Um sistema moderno de autenticação com Next.js (App Router), TypeScript e Better Auth, com suporte a login e cadastro via e-mail e senha.
O projeto inclui proteção de rotas, redirecionamento automático, integração com MongoDB e componentes estilizados com Tailwind CSS.

🚀 Tecnologias utilizadas

Next.js 14+
 – Framework React com suporte SSR e rotas App Router

TypeScript
 – Tipagem estática para maior segurança no código

Tailwind CSS
 – Estilização rápida e responsiva

Better Auth
 – Autenticação moderna e simples de configurar

MongoDB
 – Banco de dados para armazenamento dos usuários

React Hook Form + Zod
 – Validação e controle de formulários

## Estrutura do projeto
```
app/
 ├─ api/
 │   ├─ auth/
 │   │   └─ route.ts              → Handler do Better Auth
 │   ├─ signup/
 │   │   └─ route.ts              → Rota para cadastro
 │   ├─ signin/
 │   │   └─ route.ts              → Rota para login
 │
 ├─ components/
 │   ├─ AuthForm.tsx              → Formulário de login/cadastro
 │   └─ LogoutButton.tsx          → Botão de logout
 │
 ├─ dashboard/
 │   └─ page.tsx                  → Página protegida
 │
 ├─ lib/
 │   ├─ auth.ts                   → Configuração do Better Auth
 │   ├─ db/                       → Conexão com MongoDB
 │   └─ validations.ts            → Schemas Zod de validação
 │
 ├─ layout.tsx                    → Layout principal
 ├─ page.tsx                      → Página inicial (login)
 ├─ middleware.ts                 → Proteção de rotas com auth
```
## Configuração e execução
1️⃣ Clonar o repositório
git clone https://github.com/maestrowoldo/auth-app.git
cd auth-app

2️⃣ Instalar as dependências
npm install
# ou
yarn install

3️⃣ Configurar o ambiente .env.local

Crie um arquivo .env.local na raiz do projeto com:

MONGODB_URI=mongodb://localhost:27017/
AUTH_SECRET=sua_chave_supersecreta
NEXT_PUBLIC_APP_URL=http://localhost:3000

4️⃣ Rodar o servidor de desenvolvimento
npm run dev


Acesse em:
👉 http://localhost:3000

🔐 Fluxo de autenticação

/ → Formulário de login/cadastro (AuthForm.tsx)

/api/signup → Cria novo usuário no banco

/api/signin → Faz login e cria sessão

/dashboard → Página protegida (somente usuários autenticados)

LogoutButton.tsx → Faz logout e redireciona para /

🧠 Validações

As regras de validação estão no arquivo lib/validations.ts:

Email: formato válido obrigatório

Senha: mínimo de 6 caracteres

Nome: obrigatório no cadastro

🧩 Middleware de proteção

O arquivo middleware.ts garante que o usuário só acesse rotas protegidas se tiver sessão ativa:

export const config = {
  matcher: ["/dashboard/:path*"],
};

📸 Interface
Tela	Descrição

	Tela de login/cadastro responsiva

	Página protegida com dados do usuário
🧰 Scripts úteis
Comando	Descrição
npm run dev	Executa o servidor de desenvolvimento
npm run build	Gera a versão de produção
npm start	Inicia o servidor após build
npm run lint	Analisa e corrige problemas no código
🧑‍💻 Autor

Wolkendo Arias
💼 Desenvolvedor Full Stack | 💡 Entusiasta de automação e integração
📧 maestrowoldo97@gmail.com

🌐 LinkedIn
