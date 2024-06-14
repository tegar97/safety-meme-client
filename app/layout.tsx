import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafetyTweet - The best tweets for your safety",
  description: "SafetyTweet is a collection of the best tweets for your safety. We have a wide range of tweets that will make you laugh and keep you safe. Check out our collection now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
             {children}
            </ThemeProvider>
       </body>
    </html>
  );
}
