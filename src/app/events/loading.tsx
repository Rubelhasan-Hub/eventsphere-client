'use client';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* EventSphere Heartbeat Effect */}
      <div className="text-indigo-600 font-black text-4xl animate-pulse">
        EventSphere
      </div>
      <p className="text-gray-400 mt-4 text-sm font-medium tracking-widest uppercase">
        Loading please wait...
      </p>
      
      {/* Style for heart beat animation */}
      <style jsx>{`
        .animate-pulse {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.1); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}