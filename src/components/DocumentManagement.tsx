'use client';

export default function DocumentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 bengali">দলিল ব্যবস্থাপনা</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 btn-animate">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 001.071-7.816 4 4 0 01-.071-8.184A6 6 0 0115.5 6c0 .5 0 1-.5 1.5a6 6 0 01-5 6c-.5.5-1 1-1.5 1z" />
          </svg>
          <span className="bengali">দলিল আপলোড করুন</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 bengali">দলিল ব্যবস্থাপনা</h3>
          <p className="mt-1 text-sm text-gray-500 bengali">
            এখানে আপনি ওয়াকালাতনামা, আবেদনপত্র, প্রমাণপত্র এবং অন্যান্য গুরুত্বপূর্ণ দলিল আপলোড ও সংরক্ষণ করতে পারবেন।
          </p>
          <p className="mt-2 text-xs text-gray-400 bengali">
            [এই ফিচারটি শীঘ্রই যোগ করা হবে]
          </p>
        </div>
      </div>
    </div>
  );
}
