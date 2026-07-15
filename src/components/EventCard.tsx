import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@heroui/react";

interface EventCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  id: string;
}

export const EventCard = ({ title, description, price, image, id }: EventCardProps) => {
  const imageUrl = image && image.trim() !== "" ? image : "/placeholder-event.jpg";

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="grow space-y-2">
        <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 h-10">{description}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-indigo-600 font-black text-xl">${price}</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Event</span>
        </div>
      </div>

      <Link href={`/events/${id}`} className="w-full mt-4 block">
        <Button
          className="w-full bg-gray-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors duration-300"
        >
          View Details
        </Button>
      </Link>
    </div>
  );
};