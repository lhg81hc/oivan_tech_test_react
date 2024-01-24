'use client'

import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/utils/auth_helpers";

const AuthenticationProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  if (!isAuthenticated() && pathname !== '/login') {
    router.push('/login')
  }

  return children;
};

export default AuthenticationProvider;
