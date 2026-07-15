import { MongoClient, ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import { IEvent } from '@/types';
import { MotionDiv } from '@/components/MotionDiv';
import Image from 'next/image';

async function getEventDetails(id: string): Promise<IEvent | null> {
  if (!ObjectId.isValid(id)) return null;
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db("eventsphere_db");
  const event = await db.collection<IEvent>("events").findOne({ _id: new ObjectId(id) } as any); client.close();
  return event ? { ...event, _id: event._id.toString() } : null;
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventDetails(id);
  if (!event) notFound();

  return (
    <main className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <MotionDiv initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Image src={event.image} alt={event.title} width={600} height={600} className="w-full h-150 object-cover rounded-[3rem] shadow-2xl" />
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div>
            <span className="text-indigo-600 font-bold tracking-widest uppercase">{event.category}</span>
            <h1 className="text-6xl font-black text-gray-900 mt-2">{event.title}</h1>
          </div>

          <div className="flex gap-6 py-6 border-y border-gray-100">
            <div className="text-center px-6 border-r border-gray-100">
              <p className="text-gray-400 text-xs font-bold uppercase">Rating</p>
              <p className="text-2xl font-black">{event.rating || "4.5"}</p>
            </div>
            <div className="text-center px-6 border-r border-gray-100">
              <p className="text-gray-400 text-xs font-bold uppercase">Reviews</p>
              <p className="text-2xl font-black">{event.reviews || "100+"}</p>
            </div>
            <div className="text-center px-6">
              <p className="text-gray-400 text-xs font-bold uppercase">Location</p>
              <p className="text-2xl font-black">{event.location || "Dhaka"}</p>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>

          <div className="flex items-center gap-6 pt-4">
            <div className="text-4xl font-black text-indigo-600">${event.price}</div>
            <button className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all duration-300">
              Book This Event
            </button>
          </div>
        </MotionDiv>
      </div>
    </main>
  );
}