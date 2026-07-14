'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

const DashboardPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, <span className="font-bold text-violet-600">{session.user.name}</span>!
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/items/manage" className="px-6 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition">
            Manage Events
          </Link>
          <Link href="/items/add" className="px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition">
            + Add New Event
          </Link>
        </div>
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Events</h3>
          <p className="mt-2 text-4xl font-black text-gray-900">12</p>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Bookings</h3>
          <p className="mt-2 text-4xl font-black text-gray-900">5</p>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Pending</h3>
          <p className="mt-2 text-4xl font-black text-gray-900">2</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;