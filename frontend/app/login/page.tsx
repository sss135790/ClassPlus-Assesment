'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/home' });
  };

  const handleGuestLogin = () => {
    localStorage.setItem('guestUser', 'true');
    router.push('/home');
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold mb-6 text-black dark:text-white text-center">
            Welcome to ClassPlus
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Sign in to create personalized greeting cards
          </p>

          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 border border-gray-300 dark:border-gray-700 rounded font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white"
            >
              Continue with Google
            </button>

            <button
              onClick={handleGuestLogin}
              className="w-full py-3 border border-gray-300 dark:border-gray-700 rounded font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
