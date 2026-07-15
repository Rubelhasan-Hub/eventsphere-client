import { MongoClient } from 'mongodb';
import { EventCard } from '@/components/EventCard';
import { IEvent } from '@/types';
import Link from 'next/link';
import { Button } from "@heroui/react";

async function getHomePageData(): Promise<{ events: IEvent[] }> {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db("eventsphere_db");
  const events = await db.collection("events").find({}).limit(4).toArray();
  client.close();
  return { events: JSON.parse(JSON.stringify(events)) };
}

export default async function HomePage() {
  const { events } = await getHomePageData();

  return (
    <main className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-white px-4">
        <div className="absolute inset-0 bg-gray-900 z-0"></div>
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">Experience Events, Reimagined</h1>
          <Button size="lg" className="bg-indigo-600 text-white font-bold rounded-2xl px-10">Explore Now</Button>
        </div>
      </section>

      {/* 2. Featured Events (4 per row) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">Featured Events</h2>
          <Link href="/events" className="text-indigo-600 font-bold hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event: IEvent) => (
            <EventCard key={event._id} id={event._id} title={event.title} description={event.description} price={event.price} image={event.image} />
          ))}
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-10">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Music', 'Technology', 'Sports', 'Art'].map(cat => (
              <div key={cat} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-indigo-600 transition-all cursor-pointer">
                <span className="font-bold text-lg">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Statistics Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[ {label: "Events", val: "500+"}, {label: "Users", val: "10k+"}, {label: "Locations", val: "50+"}, {label: "Support", val: "24/7"} ].map(stat => (
          <div key={stat.label}>
            <h3 className="text-4xl font-black text-indigo-600">{stat.val}</h3>
            <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* 5. Testimonial Section */}
      <section className="py-20 bg-gray-900 text-white text-center px-4">
        <h2 className="text-3xl font-black mb-10">Trusted by Creators</h2>
        <p className="text-xl italic max-w-2xl mx-auto text-gray-300">The most intuitive platform I have used for event management. Flawless experience!</p>
      </section>

      {/* 6. Newsletter Section */}
      <section className="py-20 text-center px-4">
        <h2 className="text-3xl font-black mb-6">Stay Updated</h2>
        <div className="max-w-md mx-auto flex gap-2">
           <input type="email" placeholder="Enter your email" className="w-full p-4 rounded-2xl border border-gray-300" />
           <Button className="bg-black text-white px-8 rounded-2xl">Join</Button>
        </div>
      </section>
    </main>
  );
}