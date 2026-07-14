'use client';

import React, { useEffect, useState } from 'react';
import { toast } from '@heroui/react';

interface Event {
  _id: any; 
  title: string;
  description: string;
  price: number;
  status: string;
}

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const getEventId = (id: any) => (typeof id === 'string' ? id : id.$oid);

  // অ্যাপ্রুভ ফাংশন (সাথে SMS পাঠানোর লজিক)
  const handleApprove = async (id: any) => {
    const eventId = getEventId(id);
    
    // ১. ব্যাকএন্ড আপডেট
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/approve/${eventId}`, {
      method: 'PATCH',
    });

    if (res.ok) {
      setEvents(events.map(e => getEventId(e._id) === eventId ? { ...e, status: 'approved' } : e));
      toast.success("Event Approved! SMS sent to user.");
    }
  };

  // ডিলিট ফাংশন
  const handleDelete = async (id: any) => {
    // এখানে আমরা সরাসরি confirm ব্যবহার করছি যা এরর দিবে না
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    
    const eventId = getEventId(id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${eventId}`, { 
        method: 'DELETE' 
    });

    if (res.ok) {
      setEvents(events.filter(e => getEventId(e._id) !== eventId));
      toast.success("Event deleted successfully!");
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-black mb-8 text-gray-900">Admin Event Management</h1>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-bold text-gray-600">Title</th>
              <th className="p-4 font-bold text-gray-600">Price</th>
              <th className="p-4 font-bold text-gray-600">Status</th>
              <th className="p-4 font-bold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={getEventId(event._id)} className="border-t">
                <td className="p-4">{event.title}</td>
                <td className="p-4">${event.price}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    event.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {event.status === 'pending' ? 'PENDING' : 'APPROVED'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {event.status === 'pending' && (
                    <button 
                      onClick={() => handleApprove(event._id)} 
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(event._id)} 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}