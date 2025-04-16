# 💸 Finance Genie

**Finance Genie** is a smart financial assistant built with **Next.js**, powered by **Gemini AI**, and backed by **Prisma ORM** on a **Vercel** deployment. It helps users manage money smarter with real-time expense tracking, AI-powered insights, and smooth server actions 🚀.

---

## 🔮 Key Features

- 🔐 Auth with **NextAuth.js**
- 📊 Expense tracking & categorization
- 🧠 AI-powered financial suggestions (via Gemini API)
- 🧾 Budget planning and reports
- ⚡ Server Actions for optimized data flow (Next.js 14+)
- 📈 Charts with Recharts or Chart.js
- 🌐 Deployed on Vercel (Fast. Global. Free.)

---

## 💼 Tech Stack

| Layer         | Tech                                 |
|---------------|--------------------------------------|
| Framework     | Next.js (App Router, Server Actions) |
| Backend       | API Routes + Server Actions          |
| Database      | PostgreSQL (via Prisma ORM)          |
| AI Integration| Gemini Pro (via Google API)          |
| UI            | Tailwind CSS                         |
| Auth          | NextAuth.js                          |
| Hosting       | Vercel                               |

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/finance-genie.git
cd finance-genie

# 🔐 Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# 🛢️ Database
DATABASE_URL=postgresql://user:password@host:port/dbname
DIRECT_URL=postgresql://user:password@host:port/dbname

# 🧠 Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# 🛡️ Arcjet (security, rate-limiting, etc.)
ARCJET_KEY=your_arcjet_key

# 📧 Resend (email service)
RESEND_API_KEY=your_resend_api_key
