'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const FilterPanel = () => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const categories = ['all', 'Technology', 'Health', 'Food', 'Art', 'Business'];

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
      <h3 className="font-black text-gray-900 mb-6 text-xl">Categories</h3>
      <div className="space-y-3">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/events?category=${cat}&page=1`}
            className={`block px-5 py-3 rounded-2xl font-bold transition-all duration-200 ${
              currentCategory === cat 
                ? 'bg-gray-900 text-white shadow-lg' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
};