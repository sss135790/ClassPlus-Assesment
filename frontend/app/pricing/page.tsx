'use client';

import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Upgrade to Premium
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock premium greeting cards, exclusive templates, and more beautiful designs
            for every special moment.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Free Plan */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
              Free
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Basic access for everyone
            </p>

            <div className="mb-8">
              <span className="text-5xl font-bold text-black dark:text-white">
                ₹0
              </span>
            </div>

            <ul className="space-y-4 text-gray-700 dark:text-gray-300 mb-10">
              <li>✓ Access free card templates</li>
              <li>✓ Customize cards</li>
              <li>✓ Download cards</li>
              <li>✓ Unlimited usage</li>
            </ul>

            <button className="w-full py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-yellow-400 rounded-2xl p-8 relative">
            
            <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
              Popular
            </div>

            <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
              Premium
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Everything you need for premium designs
            </p>

            <div className="mb-8">
              <span className="text-5xl font-bold text-black dark:text-white">
                ₹99
              </span>

              <span className="text-gray-500 dark:text-gray-400 ml-2">
                / month
              </span>
            </div>

            <ul className="space-y-4 text-gray-700 dark:text-gray-300 mb-10">
              <li>✓ Unlock all premium cards</li>
              <li>✓ Exclusive anniversary templates</li>
              <li>✓ HD downloads</li>
              <li>✓ No watermark</li>
              <li>✓ Early access to new designs</li>
            </ul>

            <button
            onClick={() => alert('Make Payment')}
            className="w-full py-3 rounded-lg bg-yellow-400 text-black font-medium hover:opacity-90 transition"
            >
            Get Premium
            </button>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
          You can cancel your subscription anytime.
        </p>
      </div>
    </div>
  );
}