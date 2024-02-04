'use client';

import Link from "next/link";

const Home = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl uppercase">
          Welcome to url shorten service
        </h1>
        <br />
        <Link className="hover:text-gray-500" href="/urls">
          Create A Url Now
        </Link>
      </div>
    </main>
  );
}

export default Home;
