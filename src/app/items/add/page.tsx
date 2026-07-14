'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddEventPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // সাবমিটের আগে এরর রিসেট করছি

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const image = formData.get('image');

    // Validation: সব ফিল্ড চেক করা
    if (!title || !description || !price || !image) {
      setError('Please fill up all the fields!');
      return;
    }

    const eventData = {
      title,
      description,
      price: Number(price),
      image,
      status: 'pending',
      createdAt: new Date(),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert('Event submitted successfully! Waiting for admin approval.');
        router.push('/dashboard');
      } else {
        setError('Failed to submit event. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Check your network.');
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Event</h1>
      
      {/* এরর মেসেজ রেন্ডারিং */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 font-bold rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border rounded-2xl shadow-sm">
        <input name="title" placeholder="Event Title" className="w-full p-3 border rounded-lg" />
        <textarea name="description" placeholder="Description" className="w-full p-3 border rounded-lg h-32" />
        <input name="price" type="number" placeholder="Price" className="w-full p-3 border rounded-lg" />
        <input name="image" placeholder="Image URL" className="w-full p-3 border rounded-lg" />
        
        <button type="submit" className="w-full bg-violet-600 text-white py-3 rounded-lg font-bold hover:bg-violet-700 transition">
          Submit Event
        </button>
      </form>
    </main>
  );
}