'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getCardsByCategory } from '@/app/data/cards';

export default function CategoryCards() {
  const params = useParams();
  const category = params.category as string;
  const cards = getCardsByCategory(category);
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex-1 bg-white dark:bg-black px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/home" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-4 inline-block">
            ← Back to Categories
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">
            {categoryName} Cards
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a card to view and customize
          </p>
        </div>

        {cards.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No cards available in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-black dark:hover:border-white transition-colors"
              >
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`w-full h-full object-cover ${
                        card.premium ? 'blur-sm' : ''
                      }`}
                    />
                  ) : (
                    <span className="text-gray-400 dark:text-gray-600 text-sm">
                      Card Image
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-3 text-black dark:text-white">{card.title}</h3>
                  <Link
                    href={card.premium ? '/pricing' : `/card/${card.id}`}
                    className={`block w-full py-2 text-center rounded hover:opacity-80 ${
                      card.premium
                        ? 'bg-yellow-400 text-black'
                        : 'bg-black dark:bg-white text-white dark:text-black'
                    }`}
                  >
                    {card.premium ? 'Unlock with Premium' : 'See Card'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
