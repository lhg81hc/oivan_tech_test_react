'use client'

import { usePathname } from "next/navigation";
import { isAuthenticated } from "@/utils/auth_helpers";
import { redirect } from "next/navigation";
import { shareConstants } from "@/constants";

import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import PublicLayout from "@/components/PublicLayout";

import "./globals.css";
import {StoreProvider} from "@/state_management";
import {ModalRoot} from "@/components/modal";

export default function RootLayout({ children }) {
  // const isAuth = isAuthenticated();
  // const pathname = usePathname();

  // if (!isAuth && !shareConstants.PUBLIC_ROUTES.includes(pathname)) {
  //   redirect("/login");
  //
  //   return null;
  // }
  //
  // if (isAuth && shareConstants.PUBLIC_ROUTES.includes(pathname)) {
  //   redirect("/urls");
  //   return null;
  // }

  // const ConditionalLayout = isAuth ? AuthenticatedLayout : PublicLayout
  // const ConditionalLayout = PublicLayout
  //
  // return <ConditionalLayout>{children}</ConditionalLayout>;

  return (
    <html lang="en">
      <body className="min-h-screen">
        <StoreProvider>
          <main className="flex justify-center items-center bg-gray-50">
            {children}
          </main>
          <footer>
            This is the footer
          </footer>
          <ModalRoot />
        </StoreProvider>
      </body>
    </html>
  )
  // return (
  //   <html lang="en">
  //     <body className="min-h-screen">
  //       <StoreProvider>
  //         <ConditionalLayout>
  //           {children}
  //         </ConditionalLayout>
  //       </StoreProvider>
  //     </body>
  //   </html>
  // );
};
