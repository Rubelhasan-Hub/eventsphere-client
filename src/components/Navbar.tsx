'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button, toast } from '@heroui/react';
import { useSession, signOut } from '@/lib/auth-client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push('/login');
            router.refresh();
          }
        }
      });
    } catch {
      toast.danger("Logout failed");
    }
  };

  // Helper to get the first letter of the name
  const getInitial = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  if (!mounted) return null;

  return (
    <nav className="w-full bg-white border-b border-gray-200/80 sticky top-0 z-50 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left Side: Hamburger & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link href="/">
            <div className="flex items-center cursor-pointer gap-2">
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-wider">
                EventSphere
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-8">
          <Link 
            href="/" 
            className={`font-semibold text-sm transition-colors ${pathname === '/' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            Home
          </Link>
          <Link 
            href="/events" 
            className={`font-semibold text-sm transition-colors ${pathname === '/events' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            All Events
          </Link>
          <Link 
            href="/dashboard" 
            className={`font-semibold text-sm transition-colors ${pathname.startsWith('/dashboard') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            Dashboard
          </Link>
        </div>

        {/* Right Side: Authentication Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm font-bold hidden md:inline-block">
                {user.name}
              </span>
              
              {/* Conditional Avatar: Image vs First Word Initial */}
              {user.image ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-500 relative">
                  <Image
                    src={user.image}
                    alt={user.name || "User Avatar"}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center border-2 border-indigo-200 text-white font-bold text-sm select-none shadow-sm">
                  {getInitial(user.name)}
                </div>
              )}

              <Button 
                variant="ghost"
                onClick={handleLogout} 
                className="text-red-500 font-bold h-9 px-3 rounded-xl hover:bg-red-50 text-xs transition-colors"
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-indigo-600 transition-colors text-sm font-bold px-3 py-2"
              >
                Login
              </Link>
              <Button 
                className="bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors h-9 px-4 rounded-xl shadow-md shadow-indigo-600/10"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Responsive Nav Menu List */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-100 p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link 
            href="/" 
            className={`font-semibold text-sm ${pathname === '/' ? 'text-indigo-600' : 'text-gray-600'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/events" 
            className={`font-semibold text-sm ${pathname === '/events' ? 'text-indigo-600' : 'text-gray-600'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            All Events
          </Link>
          <Link 
            href="/dashboard" 
            className={`font-semibold text-sm ${pathname.startsWith('/dashboard') ? 'text-indigo-600' : 'text-gray-600'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;