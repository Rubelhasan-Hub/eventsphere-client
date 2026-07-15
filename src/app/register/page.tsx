'use client';

import React, { useState } from 'react';
import { signUp, signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.danger("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      await (signUp as any).email({
        email,
        password,
        name,
        role: "user",
        callbackURL: '/'
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          toast.success("Account Created Successfully!");
          
          try {
            await (signIn as any).email({
              email,
              password,
              callbackURL: '/'
            }, {
              onSuccess: () => {
                setLoading(false);
                toast.success("Logged in automatically!");
                router.push('/');
                router.refresh();
              },
              onError: (ctx: any) => {
                setLoading(false);
                toast.danger(ctx.error?.message || "Auto login failed, please sign in manually.");
                router.push('/login');
              }
            });
          } catch {
            setLoading(false);
            router.push('/login');
          }
        },
        onError: (ctx: any) => {
          setLoading(false);
          toast.danger(ctx.error?.message || "Registration Failed");
        }
      });
    } catch {
      setLoading(false);
      toast.danger("An unexpected error occurred");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await (signIn as any).social({
        provider: "google",
        callbackURL: "/"
      }, {
        onError: (ctx: any) => {
          toast.danger(ctx.error?.message || "Google Login Failed");
        }
      });
    } catch {
      toast.danger("Google Login Failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.07)] border border-white/80">
        <div>
          <h2 className="text-center text-4xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 bg-clip-text text-transparent">
            Get Started
          </h2>
          <p className="mt-3 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-all">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200/80 py-3.5 px-4 rounded-2xl text-sm font-bold text-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all active:scale-[0.98]"
          >
            Continue with Google
          </button>
        </div>

        <div className="relative flex py-2 items-center text-xs text-gray-400 uppercase">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink mx-4 font-bold tracking-wider">Or with email</span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-[0.99] transition-all disabled:opacity-50 duration-200"
          >
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;