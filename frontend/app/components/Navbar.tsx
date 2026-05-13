'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black dark:text-white">
          ClassPlus
        </Link>

        <div className="flex gap-4">
          {!session ? (
            <Link href="/login" className="px-4 py-1 bg-black dark:bg-white text-white dark:text-black rounded text-sm hover:opacity-80">
              Sign In
            </Link>
          ) : (
            <>
              <Link href="/profile" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Profile
              </Link>
              <Link href="/home" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Home
              </Link>
              <button onClick={() => signOut()} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
