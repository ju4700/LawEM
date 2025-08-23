'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  totalClients: number;
  activeClients: number;
  totalCases: number;
  activeCases: number;
  upcomingHearings: number;
  pendingDocuments: number;
}

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeClients: 0,
    totalCases: 0,
    activeCases: 0,
    upcomingHearings: 0,
    pendingDocuments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Set mock data for demo
      setStats({
        totalClients: 45,
        activeClients: 38,
        totalCases: 62,
        activeCases: 24,
        upcomingHearings: 8,
        pendingDocuments: 12,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'মোট ক্লায়েন্ট',
      value: stats.totalClients,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'bg-blue-500',
      change: '+১২%',
    },
    {
      title: 'সক্রিয় ক্লায়েন্ট',
      value: stats.activeClients,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'bg-green-500',
      change: '+৮%',
    },
    {
      title: 'মোট মামলা',
      value: stats.totalCases,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'bg-purple-500',
      change: '+৫%',
    },
    {
      title: 'সক্রিয় মামলা',
      value: stats.activeCases,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'bg-orange-500',
      change: '+৩%',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'মামলা #১২৩ - শুনানি',
      time: '১০:০০ AM',
      date: 'আজ',
      type: 'hearing',
      court: 'ঢাকা জেলা আদালত',
      client: 'মোহাম্মদ রহিম',
    },
    {
      id: 2,
      title: 'ক্লায়েন্ট মিটিং',
      time: '০২:৩০ PM',
      date: 'আজ',
      type: 'meeting',
      client: 'ফাতেমা খাতুন',
    },
    {
      id: 3,
      title: 'মামলা #৪৫৬ - শুনানি',
      time: '১১:০০ AM',
      date: 'আগামীকাল',
      type: 'hearing',
      court: 'সুপ্রিম কোর্ট',
      client: 'আব্দুল করিম',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'নতুন ক্লায়েন্ট যোগ করা হয়েছে',
      details: 'জনাব আহমেদ হোসেন',
      time: '২ ঘন্টা আগে',
      type: 'client',
    },
    {
      id: 2,
      action: 'মামলার ডকুমেন্ট আপলোড',
      details: 'মামলা #৭৮৯ - ওয়াকালাতনামা',
      time: '৪ ঘন্টা আগে',
      type: 'document',
    },
    {
      id: 3,
      action: 'শুনানির তারিখ আপডেট',
      details: 'মামলা #১২৩ - ২৫/০৮/২০২৫',
      time: '৬ ঘন্টা আগে',
      type: 'hearing',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
        <span className="ml-2 bengali">লোড হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold bengali">স্বাগতম, আইনজীবী সাহেব!</h1>
        <p className="mt-2 text-green-100 bengali">
          আজকের তারিখ: {new Date().toLocaleDateString('bn-BD')} | আপনার কাজের তালিকা দেখুন
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 bengali">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-green-600 font-medium">{card.change}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 bengali">আজকের কর্মসূচি</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 bengali">{event.title}</h3>
                    <p className="text-sm text-gray-600 bengali">
                      {event.client && `ক্লায়েন্ট: ${event.client}`}
                    </p>
                    {event.court && (
                      <p className="text-sm text-gray-600 bengali">আদালত: {event.court}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{event.time}</p>
                    <p className="text-xs text-gray-500 bengali">{event.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 text-center">
            <button className="text-sm text-green-600 hover:text-green-700 font-medium bengali">
              সব দেখুন →
            </button>
          </div>
        </div>

        {/* Recent activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 bengali">সাম্প্রতিক কার্যক্রম</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 bengali">{activity.action}</p>
                    <p className="text-sm text-gray-600 bengali">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1 bengali">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 text-center">
            <button className="text-sm text-green-600 hover:text-green-700 font-medium bengali">
              সব দেখুন →
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 bengali">দ্রুত কাজ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors btn-animate">
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-sm font-medium text-gray-900 bengali">নতুন ক্লায়েন্ট</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors btn-animate">
            <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-sm font-medium text-gray-900 bengali">নতুন মামলা</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors btn-animate">
            <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-900 bengali">নিয়োগ যোগ</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors btn-animate">
            <svg className="w-8 h-8 text-orange-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 001.071-7.816 4 4 0 01-.071-8.184A6 6 0 0115.5 6c0 .5 0 1-.5 1.5a6 6 0 01-5 6c-.5.5-1 1-1.5 1z" />
            </svg>
            <span className="text-sm font-medium text-gray-900 bengali">ডকুমেন্ট আপলোড</span>
          </button>
        </div>
      </div>
    </div>
  );
}
