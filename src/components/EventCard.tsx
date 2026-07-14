import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@heroui/react";

interface EventCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  id: string;
}

export const EventCard = ({ title, description, price, imageUrl, id }: EventCardProps) => (
  <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-105">
    <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 shrink-0">
      <Image src={imageUrl} alt={title} fill className="object-cover" />
    </div>
    <div className="grow space-y-2">
      <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      <div className="pt-2 text-indigo-600 font-black text-xl">${price}</div>
    </div>
    <Link href={`/events/${id}`} className="w-full mt-4 block">
      <Button className="w-full bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800">
        View Details
      </Button>
    </Link>
  </div>
);