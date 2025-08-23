'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema for login form
const loginSchema = yup.object({
  username: yup.string().required('ব্যবহারকারীর নাম প্রয়োজনীয়'),
  password: yup.string().required('পাসওয়ার্ড প্রয়োজনীয়').min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'),
});

type LoginFormData = {
  username: string;
  password: string;
};

interface LoginProps {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        onLogin(result.token);
      } else {
        setError(result.message || 'লগইন ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4l2 2 4-4"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 bengali">
            আইনজীবী ক্লায়েন্ট ব্যবস্থাপনা
          </h2>
          <p className="mt-2 text-sm text-gray-600 bengali">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700 bengali">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 bengali">
                ব্যবহারকারীর নাম
              </label>
              <input
                {...register('username')}
                type="text"
                className="mt-1 form-input bengali"
                placeholder="আপনার ব্যবহারকারীর নাম লিখুন"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 bengali">{errors.username.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 bengali">
                পাসওয়ার্ড
              </label>
              <input
                {...register('password')}
                type="password"
                className="mt-1 form-input"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 bengali">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed btn-animate bengali"
            >
              {loading ? (
                <>
                  <div className="spinner mr-2"></div>
                  লগইন হচ্ছে...
                </>
              ) : (
                'লগইন করুন'
              )}
            </button>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 bengali">ডেমো অ্যাকাউন্ট:</h3>
            <p className="text-sm text-blue-600 mt-1">
              ব্যবহারকারীর নাম: <span className="font-mono">admin</span>
            </p>
            <p className="text-sm text-blue-600">
              পাসওয়ার্ড: <span className="font-mono">123456</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
