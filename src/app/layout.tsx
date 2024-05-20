import "./globals.css";
import type { Metadata } from "next";

// PROVIDERS
import { QueryProvider, ThemeProvider } from "@/providers";

// COMPONENTS
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Next + Tanstack Query",
  description: "Next.js + Tanstack Query = 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <>
              <Navbar />
              {children}
            </>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
