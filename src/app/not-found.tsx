import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
      <div className="space-y-6">
        <h1 className="text-9xl font-black text-indigo-600 tracking-tighter">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Oops! Page not found</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>

        <Link 
          href="/" 
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}