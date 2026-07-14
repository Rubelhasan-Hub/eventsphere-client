'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@heroui/react";

export const FilterPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    // ইউআরএল আপডেট হলে পেজ অটোমেটিক রি-ফেচ হবে
    router.push(`/events?${params.toString()}`);
  };

  const categories: string[] = ['Music', 'Technology', 'Sports', 'Art', 'Health', 'Food'];

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
      <h3 className="font-black text-xl mb-6">Filters</h3>
      <div className="space-y-4">
        <button 
          onClick={() => handleFilter('category', 'all')} 
          className="block w-full text-left text-sm font-medium text-gray-600 hover:text-indigo-600"
        >
          All Categories
        </button>
        {categories.map((cat: string) => (
          <button 
            key={cat}
            onClick={() => handleFilter('category', cat)}
            className={`block w-full text-left text-sm font-bold transition ${
              searchParams.get('category') === cat ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <Button 
        className="w-full mt-6 bg-gray-900 text-white font-bold rounded-xl" 
        onClick={() => router.push('/events')}
      >
        Reset Filters
      </Button>
    </div>
  );
};