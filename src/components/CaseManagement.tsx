'use client';

import { useState, useEffect } from 'react';

interface Case {
  id: string;
  case_number: string;
  title_bn: string;
  title_en?: string;
  client_name: string;
  case_type: string;
  status: 'pending' | 'active' | 'closed' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  court_name?: string;
  next_hearing?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export default function CaseManagement() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Demo cases
  useEffect(() => {
    const demoCases: Case[] = [
      {
        id: '1',
        case_number: 'CC-2024-001',
        title_bn: 'ভূমি বিরোধ মামলা',
        title_en: 'Land Dispute Case',
        client_name: 'আব্দুল করিম',
        case_type: 'দেওয়ানি',
        status: 'active',
        priority: 'high',
        court_name: 'ঢাকা জজ আদালত',
        next_hearing: '2024-01-25',
        description: 'ভূমির মালিকানা নিয়ে বিরোধ',
        created_at: '2024-01-01T09:00:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        case_number: 'CR-2024-002',
        title_bn: 'ফৌজদারি মামলা',
        title_en: 'Criminal Case',
        client_name: 'ফাতেমা খাতুন',
        case_type: 'ফৌজদারি',
        status: 'pending',
        priority: 'medium',
        court_name: 'চট্টগ্রাম জজ আদালত',
        next_hearing: '2024-02-10',
        description: 'চুরির অভিযোগ',
        created_at: '2024-01-10T11:00:00Z',
        updated_at: '2024-01-20T14:00:00Z'
      }
    ];
    
    setTimeout(() => {
      setCases(demoCases);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'won': return 'bg-blue-100 text-blue-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'চলমান';
      case 'pending': return 'অপেক্ষমান';
      case 'closed': return 'বন্ধ';
      case 'won': return 'জয়';
      case 'lost': return 'হার';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'উচ্চ';
      case 'medium': return 'মধ্যম';
      case 'low': return 'নিম্ন';
      default: return priority;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD');
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = 
      caseItem.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.title_bn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || caseItem.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 bengali">মামলা</h2>
          <p className="text-gray-600 bengali mt-1 text-sm md:text-base">সকল মামলার তথ্য দেখুন ও নতুন মামলা যোগ করুন</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center bengali text-sm md:text-base font-medium shadow-lg w-full sm:w-auto">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          নতুন মামলা
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="মামলা নম্বর, শিরোনাম বা ক্লায়েন্ট নাম খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bengali text-sm md:text-base"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bengali text-sm md:text-base"
          >
            <option value="all">সব স্ট্যাটাস</option>
            <option value="active">চলমান</option>
            <option value="pending">অপেক্ষমান</option>
            <option value="closed">বন্ধ</option>
            <option value="won">জয়</option>
            <option value="lost">হার</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 bengali">মামলার তালিকা লোড হচ্ছে...</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="text-xs md:text-sm font-medium text-blue-600 bengali">মোট মামলা</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-700">{cases.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-xl">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="text-xs md:text-sm font-medium text-green-600 bengali">চলমান</p>
                  <p className="text-lg md:text-2xl font-bold text-green-700">{cases.filter(c => c.status === 'active').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-xl">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="text-xs md:text-sm font-medium text-yellow-600 bengali">অপেক্ষমান</p>
                  <p className="text-lg md:text-2xl font-bold text-yellow-700">{cases.filter(c => c.status === 'pending').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="text-xs md:text-sm font-medium text-purple-600 bengali">বন্ধ</p>
                  <p className="text-lg md:text-2xl font-bold text-purple-700">{cases.filter(c => c.status === 'closed').length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Case List */}
          {filteredCases.length === 0 ? (
            <div className="text-center py-12 px-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm md:text-base font-medium text-gray-900 bengali">কোন মামলা নেই</h3>
              <p className="mt-1 text-sm text-gray-500 bengali">
                {searchTerm ? 'আপনার অনুসন্ধানের সাথে কোন মামলা মিলেনি' : 'প্রথম মামলা যোগ করে শুরু করুন'}
              </p>
              {!searchTerm && (
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 bengali">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    নতুন মামলা যোগ করুন
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCases.map((caseItem) => (
                <div key={caseItem.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-xl p-2 md:p-3">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)} bengali`}>
                        {getStatusText(caseItem.status)}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(caseItem.priority)} bengali`}>
                        {getPriorityText(caseItem.priority)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 bengali">{caseItem.title_bn}</h3>
                        <span className="text-sm text-gray-500 font-mono">#{caseItem.case_number}</span>
                      </div>
                      {caseItem.title_en && (
                        <p className="text-sm text-gray-600">{caseItem.title_en}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="bengali">ক্লায়েন্ট: {caseItem.client_name}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="bengali">ধরন: {caseItem.case_type}</span>
                      </div>
                      {caseItem.court_name && (
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="bengali">আদালত: {caseItem.court_name}</span>
                        </div>
                      )}
                      {caseItem.next_hearing && (
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="bengali">পরবর্তী শুনানি: {formatDate(caseItem.next_hearing)}</span>
                        </div>
                      )}
                    </div>
                    
                    {caseItem.description && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600 bengali">
                          <span className="font-medium">বিবরণ:</span> {caseItem.description}
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-500 bengali">
                        তৈরি: {formatDate(caseItem.created_at)}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
