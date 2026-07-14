'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

const DashboardPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-gray-900">Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">
        Welcome back, <span className="font-bold text-indigo-600">{session.user.name}</span>!
      </p>
      
      {/* Dashboard Stats/Content Placeholders */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Events</h3>
          <p className="mt-2 text-3xl font-black text-gray-900">12</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Bookings</h3>
          <p className="mt-2 text-3xl font-black text-gray-900">5</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Pending</h3>
          <p className="mt-2 text-3xl font-black text-gray-900">2</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;