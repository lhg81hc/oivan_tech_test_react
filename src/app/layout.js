'use client'

import { usePathname } from "next/navigation";
import { isAuthenticated } from "@/utils/auth_helpers";
import { redirect } from "next/navigation";
import { shareConstants } from "@/constants";
import { StoreProvider } from "@/state_management";

import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import PublicLayout from "@/components/PublicLayout";

import "./globals.css";

export default function RootLayout({ children }) {
  const isAuth = isAuthenticated();
  const pathname = usePathname();

  if(!isAuth && !shareConstants.PUBLIC_ROUTES.includes(pathname)) {
    redirect("/login");
  }

  const ConditionalLayout = isAuth ? AuthenticatedLayout : PublicLayout

  return (
    <html lang="en">
      <body className="min-h-screen">
        <StoreProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
