import { EventCard } from '@/components/EventCard';
import { FilterPanel } from '@/components/FilterPanel';
import { IEvent } from '@/types';
import Link from 'next/link';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

// API থেকে ডাটা ফেচ করার ফাংশন
async function fetchEvents(params: Record<string, string | undefined>) {
  // শুধুমাত্র undefined নয় এমন ভ্যালুগুলো নিয়ে কুয়েরি তৈরি করুন
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined)
  );
  const query = new URLSearchParams(cleanParams as Record<string, string>).toString();
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events?${query}`, {
    headers: {
      "Authorization": `Bearer ${session?.session?.token || ""}`,
      "Content-Type": "application/json"
    },
    cache: 'no-store'
  });

  if (!res.ok) throw new Error("API Call Failed");
  return res.json();
}

export default async function EventsPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>
}) {
  const params = await searchParams;
  const { events, totalPages, currentPage } = await fetchEvents(params);

  // প্যাগিনেশন লিঙ্কের জন্য হেল্পার ফাংশন
  const getPageLink = (page: number) => {
    const p = new URLSearchParams(params as Record<string, string>);
    p.set('page', page.toString());
    return `?${p.toString()}`;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-8">Explore Events</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <FilterPanel />
        </aside>

        <section className="grow">
          {events && events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event: IEvent) => (
                  <EventCard
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    description={event.description}
                    price={event.price}
                    image={event.image || "/placeholder-event.png"}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 mt-16">
                <Link
                  href={getPageLink(currentPage - 1)}
                  className={`px-6 py-3 rounded-2xl font-black ${currentPage <= 1 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-gray-900 text-white'}`}
                >Previous</Link>

                <span className="font-bold text-gray-900">Page {currentPage} of {totalPages}</span>

                <Link
                  href={getPageLink(currentPage + 1)}
                  className={`px-6 py-3 rounded-2xl font-black ${currentPage >= totalPages ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-gray-900 text-white'}`}
                >Next</Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">No events found</h3>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}