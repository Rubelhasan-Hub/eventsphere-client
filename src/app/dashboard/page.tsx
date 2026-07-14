'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

interface CustomUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

const DashboardPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ totalEvents: 0, activeBookings: 0, pending: 0 });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session?.user) return null;

  const user = session.user as CustomUser;
  const userRole = user?.role || 'user';
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, <span className="font-bold text-violet-600">{user.name}</span>!
            <span className="ml-2 px-2 py-1 bg-violet-200 text-black text-xs font-bold rounded uppercase">
              {userRole}
            </span>
          </p>
        </div>
        
        {/* রিকোয়ারমেন্ট অনুযায়ী বাটন লজিক */}
        <div className="flex gap-4">
          {userRole === 'admin' && (
            <Link href="/items/manage" className="px-6 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition">
              Manage Events
            </Link>
          )}
          
          {/* Add Event এ ক্লিক করলে এখন সরাসরি /items/add এ যাবে */}
          <Link href="/items/add" className="px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition">
            + Add New Event
          </Link>
        </div>
      </div>
      
      {/* স্ট্যাটাস কার্ডস */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Events</h3>
          <p className="mt-2 text-4xl font-black text-gray-900">{stats.totalEvents}</p>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Bookings</h3>
          <p className="mt-2 text-4xl font-black text-gray-900">{stats.activeBookings}</p>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Pending</h3>
          <p className="mt-2 text-4xl font-black text-gray-900">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;