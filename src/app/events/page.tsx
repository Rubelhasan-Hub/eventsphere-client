import { MongoClient, Filter } from 'mongodb';
import { EventCard } from '@/components/EventCard';
import { FilterPanel } from '@/components/FilterPanel';
import { IEvent } from '@/types';
import Link from 'next/link';

async function getEvents(params: { category?: string; search?: string; page?: string }) {
  const page = parseInt(params.page || "1");
  const limit = 6;
  const skip = (page - 1) * limit;

  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db("eventsphere_db");
  
  const query: Filter<IEvent> = {};
  
  if (params.search) {
    query.title = { $regex: params.search, $options: 'i' };
  }
  
  if (params.category && params.category !== 'all') {
    query.category = params.category;
  }
  
  const totalEvents = await db.collection<IEvent>("events").countDocuments(query);
  const events = await db.collection<IEvent>("events")
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();
    
  client.close();
  
  return {
    events: events.map(e => ({ ...e, _id: e._id.toString() })),
    totalPages: Math.ceil(totalEvents / limit),
    currentPage: page
  };
}

export default async function EventsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ category?: string; search?: string; page?: string }> 
}) {
  const params = await searchParams;
  const { events, totalPages, currentPage } = await getEvents(params);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-8">Explore Events</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <FilterPanel />
        </aside>
        
        <section className="grow">
          {events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event: IEvent) => (
                  <EventCard key={event._id} id={event._id} {...event} />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 mt-16">
                <Link 
                  href={`?page=${currentPage - 1}${params.category ? `&category=${params.category}` : ''}`}
                  className={`px-6 py-3 rounded-2xl font-black ${currentPage <= 1 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-gray-900 text-white'}`}
                >Previous</Link>
                
                <span className="font-bold text-gray-900">Page {currentPage} of {totalPages}</span>
                
                <Link 
                  href={`?page=${currentPage + 1}${params.category ? `&category=${params.category}` : ''}`}
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