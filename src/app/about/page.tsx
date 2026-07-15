'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Crafting Experiences, <br />
            <span className="text-indigo-600">One Event at a Time</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            EventSphere is a premier platform dedicated to simplifying the way people discover, manage, and host unforgettable events.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Our Mission", desc: "To connect creators and attendees through seamless technology." },
            { title: "Our Vision", desc: "To become the global standard for event management solutions." },
            { title: "Our Values", desc: "Innovation, transparency, and a passion for excellence." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 rounded-[3rem] p-12 text-center text-white"
        >
          <h2 className="text-3xl font-black mb-6">Ready to create something amazing?</h2>
          <button className="bg-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-indigo-500 transition-all">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </main>
  );
}