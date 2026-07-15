'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@heroui/react';

export default function AddEventPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const eventData = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      image: formData.get('image'),
      category: formData.get('category'),
      date: formData.get('date'),
      location: formData.get('location'),
      status: 'approved',
      createdAt: new Date().toISOString(),
    };

    if (Object.values(eventData).some(val => !val)) {
      setError('Please fill up all fields accurately!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        toast.success('Event submitted successfully! Waiting for admin approval.');
        router.push('/dashboard');
      } else {
        setError('Failed to submit event. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900">Add New Event</h1>
        <p className="text-gray-500 mt-2">Fill in the details to list your event on EventSphere.</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 font-bold rounded-2xl border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-gray-100 rounded-3xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input required name="title" placeholder="Event Title" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-indigo-600 transition" />
          <select required name="category" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-indigo-600 transition text-gray-500">
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Food">Food</option>
            <option value="Art">Art</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <textarea required name="description" placeholder="Event Description" className="w-full p-4 border border-gray-200 rounded-2xl h-32 outline-none focus:border-indigo-600 transition" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input required name="price" type="number" placeholder="Price ($)" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-indigo-600 transition" />
          <input required name="date" type="date" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-indigo-600 transition text-gray-500" />
          <input required name="location" placeholder="Location" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-indigo-600 transition" />
        </div>

        <input required name="image" placeholder="Image URL" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-indigo-600 transition" />
        
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Event'}
        </button>
      </form>
    </main>
  );
}