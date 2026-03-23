import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import JobMap from "@/components/JobMap";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import BotpressChat from "../components/BotpressChat";

export const metadata = {
  title: "Rozgar Hub",
  description: "Connect with Skilled Workers Instantly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#0f172a]">
        
        {/* App Content */}
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>

        {/* ✅ Botpress Chat (ONLY ONCE) */}
        <BotpressChat />

      </body>
    </html>
  );
}
