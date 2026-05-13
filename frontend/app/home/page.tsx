'use client';

import Link from 'next/link';

const categories = [
  { id: 'wedding', name: 'Wedding', emoji: '💒' },
  { id: 'birthday', name: 'Birthday', emoji: '🎂' },
  { id: 'holi', name: 'Holi', emoji: '🎨' },
  { id: 'diwali', name: 'Diwali', emoji: '🪔' },
  { id: 'christmas', name: 'Christmas', emoji: '🎄' },
  { id: 'anniversary', name: 'Anniversary', emoji: '💝' },
];

export default function Home() {
  return (
    <div className="flex-1 bg-white dark:bg-black px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">
          Choose a Category
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Select a category to browse greeting cards
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/cards/${category.id}`}
              className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-black dark:hover:border-white transition-colors text-center"
            >
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h2 className="text-lg font-medium text-black dark:text-white">
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
