'use client'

import { usePathname } from "next/navigation";
import { isAuthenticated } from "@/utils/auth_helpers";
import { redirect } from "next/navigation";
import { shareConstants } from "@/constants";

import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import PublicLayout from "@/components/PublicLayout";
import { StoreProvider } from "@/state-management";
import { ModalRoot } from "@/components/modal";
import Link from "next/link";

import "./globals.css";

export default function RootLayout({ children }) {
  const isAuth = isAuthenticated();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    // dispatch(logOut());
    // router.push('/login');
  }

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
  // // const ConditionalLayout = PublicLayout
  //
  // return <ConditionalLayout>{children}</ConditionalLayout>;


  return (
    <html>
      <body>
        <StoreProvider>
          {/*<header>*/}
          {/*  <nav>*/}
          {/*    <div className="flex lg:flex-1">*/}
          {/*      <a href="/" className="-m-1.5 p-1.5">*/}
          {/*        <img className="w-16" src="/logo.png" alt="..."/>*/}
          {/*      </a>*/}
          {/*    </div>*/}
          {/*    <div className="flex lg:flex-1">*/}
          {/*      <ul className="flex items-center gap-[4vw] w-full justify-end">*/}
          {/*        <li>*/}
          {/*          <Link className="hover:text-gray-500" href="/urls">URLs</Link>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          <Link className="hover:text-gray-500" href="/users">Users</Link>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          <a href="#" className="hover:text-gray-500" onClick={handleLogoutClick}>Logout</a>*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}
          {/*  </nav>*/}
          {/*</header>*/}
          <main className="flex justify-center items-center bg-gray-50">
            {children}
          </main>
          <footer>
            FOOTER
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
