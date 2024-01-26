'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuthenticated } from "@/utils/auth_helpers";

const Home = () => {
  const authenticated = isAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push('/login')
    } else {
      router.push('/urls')
    }
  }, []);

  return (
    <section className="flex justify-center items-center h-screen">
      <h1 className="text-4xl uppercase">Welcome to url shorten service</h1>
    </section>
  );
}

export default Home;
