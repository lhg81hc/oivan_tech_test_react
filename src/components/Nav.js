'use client';
import Link from 'next/link';
import React from 'react';

export default function Nav() {
  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-b-gray-600 bg-indigo-100"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            Logo
          </a>
        </div>

        <Link href="/urls">My URLs</Link>
        <Link href="/users">Users</Link>
      </nav>
    </header>
  )
}
