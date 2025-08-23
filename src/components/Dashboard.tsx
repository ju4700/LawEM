'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ClientManagement from './ClientManagement';
import CaseManagement from './CaseManagement';
import DashboardHome from './DashboardHome';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [showCaseForm, setShowCaseForm] = useState(false);

  const handleNewClient = () => {
    setActiveTab('clients');
    setShowClientForm(true);
  };

  const handleNewCase = () => {
    setActiveTab('cases');
    setShowCaseForm(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardHome 
            onNewClient={handleNewClient}
            onNewCase={handleNewCase}
            onNavigateToClients={() => setActiveTab('clients')}
            onNavigateToCases={() => setActiveTab('cases')}
          />
        );
      case 'clients':
        return (
          <ClientManagement 
            openNewForm={showClientForm}
            onFormOpened={() => setShowClientForm(false)}
          />
        );
      case 'cases':
        return (
          <CaseManagement 
            openNewForm={showCaseForm}
            onFormOpened={() => setShowCaseForm(false)}
          />
        );
      default:
        return (
          <DashboardHome 
            onNewClient={handleNewClient}
            onNewCase={handleNewCase}
            onNavigateToClients={() => setActiveTab('clients')}
            onNavigateToCases={() => setActiveTab('cases')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={onLogout}
        />

        {/* Page content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
