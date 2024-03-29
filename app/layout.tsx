"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "./_components/navbar";
import RootFooter from "./_components/rootFooter";
import { Card, CardContent } from "@/components/ui/card";
import { store, useAppSelector } from "./store";
import { actions } from "./store/auth/auth-slice";
import { StoreWrapper } from "./StoreWrapper";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StoreWrapper>
          <Navbar />
          {children}
        </StoreWrapper>

        <RootFooter />
      </body>
    </html>
  );
}
