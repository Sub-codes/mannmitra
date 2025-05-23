import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import {
  ClerkProvider,

} from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MannMitra: Your Digital Companion for Mental Clarity",
  description: "One stop mental health Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen mt-40">{children}</main>
          <footer className="bg-blue-100 py-12">
            <div className="mx-auto container text-center px-4 text-gray-600">
              © {new Date().getFullYear()} Boomer Cooker. All rights reserved.
            </div>
          </footer>
          <Toaster richColors position="top-right" />
        </body>
        
<script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>

<df-messenger
  intent="WELCOME"
  chat-title="MannMitra"
  agent-id="mannmitrabot-eqyt"
  language-code="en"
></df-messenger>

      </html>
    </ClerkProvider>
  );
}
