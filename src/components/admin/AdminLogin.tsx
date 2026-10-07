import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Lock, User, KeyRound, Stethoscope, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, navigate } = useSite();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      const data = await res.json();
      if (res.ok && data.success) {
        loginAdmin();
        navigate('/admin');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff & Doctor Portal</h1>
          <p className="text-xs text-slate-500">
            Dr. Puneet Kumar Clinic Management System
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-2xl text-xs flex items-center gap-2 border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white text-xs text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-2xl transition-colors cursor-pointer text-xs flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Authenticating...' : 'Sign in to Admin Dashboard'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
