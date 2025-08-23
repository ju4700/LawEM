'use client';

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 bengali">ক্যালেন্ডার ও সময়সূচী</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 btn-animate">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="bengali">নতুন ইভেন্ট যোগ করুন</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 bengali">ক্যালেন্ডার ও সময়সূচী</h3>
          <p className="mt-1 text-sm text-gray-500 bengali">
            এখানে আপনি শুনানির তারিখ, ক্লায়েন্ট মিটিং এবং অন্যান্য গুরুত্বপূর্ণ ইভেন্ট ট্র্যাক করতে পারবেন।
          </p>
          <p className="mt-2 text-xs text-gray-400 bengali">
            [এই ফিচারটি শীঘ্রই যোগ করা হবে]
          </p>
        </div>
      </div>
    </div>
  );
}
