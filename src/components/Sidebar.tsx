'use client';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const navigation = [
  {
    name: 'ড্যাশবোর্ড',
    id: 'dashboard',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'ক্লায়েন্ট',
    id: 'clients',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
  },
  {
    name: 'মামলা',
    id: 'cases',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose, onLogout }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:bg-gray-900">
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Logo */}
          <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4l2 2 4-4" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-bold text-white bengali">LawEM</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`group flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium bengali transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3 flex-shrink-0">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>

          {/* User info and logout */}
          <div className="flex flex-shrink-0 bg-gray-800 p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">অ</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white bengali">আইনজীবী</p>
                  <p className="text-xs text-gray-400">অনলাইন</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="ml-3 text-gray-400 hover:text-white transition-colors"
                title="লগআউট"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Mobile header */}
          <div className="flex h-16 flex-shrink-0 items-center justify-between bg-gray-900 px-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4l2 2 4-4" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-bold text-white bengali">LawEM</h1>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`group flex w-full items-center rounded-xl px-4 py-4 text-base font-medium bengali transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white active:bg-gray-600'
                }`}
              >
                <span className="mr-4 flex-shrink-0">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile user info */}
          <div className="flex flex-shrink-0 bg-gray-800 p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">অ</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white bengali">আইনজীবী</p>
                  <p className="text-xs text-gray-400">অনলাইন</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="ml-3 text-gray-400 hover:text-white transition-colors"
                title="লগআউট"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
