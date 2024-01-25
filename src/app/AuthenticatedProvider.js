'use client'

import { usePathname } from "next/navigation";
import { isAuthenticated } from "@/utils/auth_helpers";
import { useRouter } from "next/router";
import Nav from "@/components/Nav";

const AuthenticationProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const authenticated = isAuthenticated();

  if (!authenticated && pathname !== '/login') {
    router.push('/login')
  }

  return (
    <>
      {authenticated && <Nav />}
      <div className="flex justify-center items-center bg-gray-50">
        {children}
      </div>
    </>
  )
};

export default AuthenticationProvider;
