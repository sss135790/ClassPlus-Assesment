'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [profileUrl, setProfileUrl] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileUrl(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      if (profileUrl) {
        formData.append('profileUrl', profileUrl);
      }
      if (session?.user?.email) {
        formData.append('email', session.user.email);
      }

      const response = await fetch(`${API_URL}/api/profile`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setTimeout(() => {
          router.push('/home');
        }, 2000);
      } else {
        setMessage(data.error || 'Failed to update profile');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <div className={`p-3 rounded text-sm ${
                message.includes('success') 
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' 
                  : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
              }`}>
                {message}
              </div>
            )}

            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                required
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-100 dark:file:bg-gray-700 file:text-black dark:file:text-white file:cursor-pointer"
              />
              {previewUrl && (
                <div className="mt-3 flex justify-center">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700" 
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded font-medium hover:opacity-80 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
