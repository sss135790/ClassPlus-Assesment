export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white dark:bg-black">
      <main className="text-center max-w-lg px-6">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
          Create Greeting Cards
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Design and share personalized greeting cards for any occasion.
        </p>
        <button className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded hover:opacity-80">
          Get Started
        </button>
      </main>
    </div>
  );
}
