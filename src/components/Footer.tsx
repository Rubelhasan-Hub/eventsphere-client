import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white">EventSphere</h2>
          <p className="text-sm leading-relaxed">
            Discover, book, and manage your events seamlessly with the world is most intuitive platform.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-indigo-400">About Us</Link></li>
            <li><Link href="/events" className="hover:text-indigo-400">All Events</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-400">Contact Support</Link></li>
            <li><Link href="/terms" className="hover:text-indigo-400">Terms & Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Stay Updated</h3>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-900 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button className="bg-indigo-600 text-white font-bold p-3 rounded-xl hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-gray-900 rounded-full hover:bg-indigo-600 transition"><FaFacebook size={20} /></a>
            <a href="#" className="p-3 bg-gray-900 rounded-full hover:bg-indigo-600 transition"><FaTwitter size={20} /></a>
            <a href="#" className="p-3 bg-gray-900 rounded-full hover:bg-indigo-600 transition"><FaInstagram size={20} /></a>
            <a href="#" className="p-3 bg-gray-900 rounded-full hover:bg-indigo-600 transition"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-sm">
        <p>&copy; 2026 EventSphere Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};