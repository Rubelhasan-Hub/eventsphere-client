import { MongoClient, ObjectId, Filter } from 'mongodb';
import { notFound } from 'next/navigation';
import { IEvent } from '@/types';

async function getEventDetails(id: string): Promise<IEvent | null> {
  if (!ObjectId.isValid(id)) return null;

  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db("eventsphere_db");

  const query: Filter<IEvent> = { _id: new ObjectId(id) as any };

  const event = await db.collection<IEvent>("events").findOne(query);
  client.close();

  if (!event) return null;

  return {
    ...event,
    _id: event._id.toString()
  };
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventDetails(id);

  if (!event) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover rounded-3xl"
        />
        <div className="space-y-6">
          <h1 className="text-4xl font-black">{event.title}</h1>
          <p className="text-gray-600 text-lg">{event.description}</p>
          <div className="flex gap-4 font-bold text-lg">
            <span className="text-indigo-600">Price: ${event.price}</span>
            <span className="text-gray-500">Category: {event.category}</span>
          </div>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </main>
  );
}