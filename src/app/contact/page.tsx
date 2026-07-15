'use client';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Contact Support</h1>
          <p className="text-gray-500 mb-8">Need help? We are here to assist you with any questions or issues.</p>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl border border-gray-200" />
              <input type="email" placeholder="Email Address" className="w-full p-4 rounded-xl border border-gray-200" />
            </div>
            <textarea placeholder="How can we help?" rows={5} className="w-full p-4 rounded-xl border border-gray-200"></textarea>
            <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}