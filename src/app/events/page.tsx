import { MongoClient, Filter } from 'mongodb';
import { EventCard } from '@/components/EventCard';
import { FilterPanel } from '@/components/FilterPanel';
import { IEvent } from '@/types';

async function getEvents(params: { category?: string; search?: string }): Promise<IEvent[]> {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db("eventsphere_db");
  
  const query: Filter<IEvent> = {};
  
  if (params.search) {
    query.title = { $regex: params.search, $options: 'i' };
  }
  
  if (params.category && params.category !== 'all') {
    query.category = params.category;
  }
  
  const events = await db.collection<IEvent>("events").find(query).toArray();
  client.close();
  
  return events.map(event => ({
    ...event,
    _id: event._id.toString(),
  }));
}

export default async function EventsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ category?: string; search?: string }> 
}) {
  const params = await searchParams;
  const events = await getEvents(params);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-8">Explore Events</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <FilterPanel />
        </aside>
        <section className="flex-grow">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event: IEvent) => (
                <EventCard 
                  key={event._id} 
                  id={event._id} 
                  title={event.title} 
                  description={event.description} 
                  price={event.price} 
                  image={event.image} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <h3 className="text-xl font-bold text-gray-900">No events found</h3>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}