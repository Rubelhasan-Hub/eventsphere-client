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
      await signUp.email({
        email,
        password,
        name,
        callbackURL: '/'
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          toast.success("Account Created Successfully!");
          
          try {
            await signIn.email({
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
              onError: (ctx) => {
                setLoading(false);
                toast.danger(ctx.error.message || "Auto login failed, please sign in manually.");
                router.push('/login');
              }
            });
          } catch {
            setLoading(false);
            router.push('/login');
          }
        },
        onError: (ctx) => {
          setLoading(false);
          toast.danger(ctx.error.message || "Registration Failed");
        }
      });
    } catch {
      setLoading(false);
      toast.danger("An unexpected error occurred");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/"
      }, {
        onError: (ctx) => {
          toast.danger(ctx.error.message || "Google Login Failed");
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

        {/* Google Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200/80 py-3.5 px-4 rounded-2xl text-sm font-bold text-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all active:scale-[0.98]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.95 11.95 0 0 0 12 .909c-4.473 0-8.345 2.454-10.382 6.073l3.647 2.783z" />
              <path fill="#4285F4" d="M23.455 12.273c0-.818-.064-1.609-.191-2.373H12v4.527h6.427a5.57 5.57 0 0 1-2.409 3.655l3.709 2.873c2.164-2 3.428-4.945 3.428-8.682z" />
              <path fill="#FBBC05" d="M5.266 14.235L1.62 17.018A11.95 11.95 0 0 0 12 23.091c3.255 0 5.991-1.073 7.991-2.918l-3.709-2.873a7.127 7.127 0 0 1-4.282 1.209c-3.1 0-5.755-2.091-6.734-4.873z" />
              <path fill="#34A853" d="M1.618 6.982C.582 8.527 0 10.209 0 12s.582 3.473 1.618 5.018l3.648-2.783A7.042 7.042 0 0 1 4.91 12c0-1.01.218-1.973.573-2.855L1.618 6.982z" />
            </svg>
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
            {/* Name Input */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200"
                placeholder="alex@example.com"
              />
            </div>

            {/* Password Input with Eye View Icon */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200"
                  placeholder="••••••••"
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