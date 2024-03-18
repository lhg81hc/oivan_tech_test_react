'use client';

import Link from 'next/link';
import React from 'react';
import { useDispatch } from "react-redux";
import { logOut } from "@/state-management/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Nav() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logOut());
    router.push('/login');
  }

  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-b-gray-600 bg-amber-50"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img className="w-16" src="/logo.png" alt="..."/>
          </a>
        </div>

        <div className="flex lg:flex-1">
          <ul className="flex items-center gap-[4vw] w-full justify-end">
            <li>
              <Link className="hover:text-gray-500" href="/urls">URLs</Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" href="/users">Users</Link>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500" onClick={handleLogoutClick}>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
