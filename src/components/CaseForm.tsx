'use client';

import { useState, useEffect } from 'react';
import { CASE_TYPES, CASE_STATUS } from '@/types/database';

interface CaseFormData {
  title: string;
  case_number?: string;
  case_type: string;
  client_id: string;
  client_name?: string; // For display
  court_name?: string;
  judge_name?: string;
  opposing_party?: string;
  case_value?: number;
  filing_date?: string;
  next_hearing_date?: string;
  status: string;
  description?: string;
  notes?: string;
}

interface Client {
  id: string;
  name_bn: string;
  name_en?: string;
  phone: string;
}

interface CaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CaseFormData) => void;
  loading?: boolean;
}

export default function CaseForm({ isOpen, onClose, onSubmit, loading = false }: CaseFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [formData, setFormData] = useState<CaseFormData>({
    title: '',
    case_number: '',
    case_type: '',
    client_id: '',
    court_name: '',
    judge_name: '',
    opposing_party: '',
    case_value: undefined,
    filing_date: '',
    next_hearing_date: '',
    status: 'pending',
    description: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CaseFormData, string>>>({});

  // Fetch clients when component opens
  useEffect(() => {
    if (isOpen) {
      fetchClients();
    }
  }, [isOpen]);

  const fetchClients = async () => {
    try {
      setLoadingClients(true);
      const response = await fetch('/api/clients');
      const data = await response.json();
      
      if (data.success) {
        setClients(data.clients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoadingClients(false);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CaseFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'মামলার শিরোনাম প্রয়োজনীয়';
    }

    if (!formData.case_type) {
      newErrors.case_type = 'মামলার ধরন নির্বাচন করুন';
    }

    if (!formData.client_id) {
      newErrors.client_id = 'ক্লায়েন্ট নির্বাচন করুন';
    }

    if (!formData.status) {
      newErrors.status = 'মামলার অবস্থা নির্বাচন করুন';
    }

    if (formData.filing_date && formData.next_hearing_date && 
        new Date(formData.filing_date) > new Date(formData.next_hearing_date)) {
      newErrors.next_hearing_date = 'শুনানির তারিখ দাখিলের তারিখের পরে হতে হবে';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CaseFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClientChange = (clientId: string) => {
    const selectedClient = clients.find(c => c.id === clientId);
    setFormData(prev => ({ 
      ...prev, 
      client_id: clientId,
      client_name: selectedClient ? selectedClient.name_bn : ''
    }));
    if (errors.client_id) {
      setErrors(prev => ({ ...prev, client_id: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Clean up the data before submission
    const submissionData = { ...formData };
    
    // Convert case_value to number if provided
    if (submissionData.case_value) {
      submissionData.case_value = Number(submissionData.case_value);
    }
    
    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      case_number: '',
      case_type: '',
      client_id: '',
      court_name: '',
      judge_name: '',
      opposing_party: '',
      case_value: undefined,
      filing_date: '',
      next_hearing_date: '',
      status: 'pending',
      description: '',
      notes: '',
    });
    setErrors({});
    setCurrentStep(1);
    onClose();
  };

  const nextStep = () => {
    // Validate step 1 fields before proceeding
    const step1Errors: Partial<Record<keyof CaseFormData, string>> = {};
    
    if (!formData.title.trim()) {
      step1Errors.title = 'মামলার শিরোনাম প্রয়োজনীয়';
    }
    
    if (!formData.case_type) {
      step1Errors.case_type = 'মামলার ধরন নির্বাচন করুন';
    }
    
    if (!formData.client_id) {
      step1Errors.client_id = 'ক্লায়েন্ট নির্বাচন করুন';
    }

    setErrors(step1Errors);
    
    if (Object.keys(step1Errors).length === 0) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => setCurrentStep(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-4 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 bengali">নতুন মামলা যোগ করুন</h3>
            <p className="text-sm text-gray-600 bengali mt-1">
              ধাপ {currentStep} এর ২
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 bengali mb-4">মূল তথ্য</h4>
              
              {/* Case Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  মামলার শিরোনাম *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="form-input bengali"
                  placeholder="যেমন: জমি বিরোধ - আহমেদ বনাম করিম"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.title}</p>
                )}
              </div>

              {/* Case Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  মামলা নম্বর
                </label>
                <input
                  type="text"
                  value={formData.case_number}
                  onChange={(e) => handleInputChange('case_number', e.target.value)}
                  className="form-input"
                  placeholder="যেমন: সিভিল ১২৩/২০২৪"
                />
              </div>

              {/* Case Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  মামলার ধরন *
                </label>
                <select
                  value={formData.case_type}
                  onChange={(e) => handleInputChange('case_type', e.target.value)}
                  className="form-input bengali"
                >
                  <option value="">মামলার ধরন নির্বাচন করুন</option>
                  {CASE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.case_type && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.case_type}</p>
                )}
              </div>

              {/* Client Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  ক্লায়েন্ট *
                </label>
                {loadingClients ? (
                  <div className="form-input flex items-center">
                    <div className="spinner mr-2"></div>
                    <span className="bengali">ক্লায়েন্ট লোড হচ্ছে...</span>
                  </div>
                ) : (
                  <select
                    value={formData.client_id}
                    onChange={(e) => handleClientChange(e.target.value)}
                    className="form-input bengali"
                  >
                    <option value="">ক্লায়েন্ট নির্বাচন করুন</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name_bn} - {client.phone}
                      </option>
                    ))}
                  </select>
                )}
                {errors.client_id && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.client_id}</p>
                )}
              </div>

              {/* Case Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  মামলার অবস্থা *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="form-input bengali"
                >
                  {CASE_STATUS.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.status}</p>
                )}
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors bengali"
                >
                  পরবর্তী ধাপ →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Additional Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 bengali mb-4">অতিরিক্ত তথ্য</h4>
              
              {/* Court Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                    আদালতের নাম
                  </label>
                  <input
                    type="text"
                    value={formData.court_name}
                    onChange={(e) => handleInputChange('court_name', e.target.value)}
                    className="form-input bengali"
                    placeholder="যেমন: জেলা জজ আদালত, ঢাকা"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                    বিচারকের নাম
                  </label>
                  <input
                    type="text"
                    value={formData.judge_name}
                    onChange={(e) => handleInputChange('judge_name', e.target.value)}
                    className="form-input bengali"
                    placeholder="যেমন: জনাব মোহাম্মদ আলী"
                  />
                </div>
              </div>

              {/* Opposing Party */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  বিপক্ষ পক্ষ
                </label>
                <input
                  type="text"
                  value={formData.opposing_party}
                  onChange={(e) => handleInputChange('opposing_party', e.target.value)}
                  className="form-input bengali"
                  placeholder="বিপক্ষ পক্ষের নাম"
                />
              </div>

              {/* Case Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  মামলার মূল্য (টাকা)
                </label>
                <input
                  type="number"
                  value={formData.case_value || ''}
                  onChange={(e) => handleInputChange('case_value', e.target.value ? Number(e.target.value) : 0)}
                  className="form-input"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Important Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                    দাখিলের তারিখ
                  </label>
                  <input
                    type="date"
                    value={formData.filing_date}
                    onChange={(e) => handleInputChange('filing_date', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                    পরবর্তী শুনানির তারিখ
                  </label>
                  <input
                    type="date"
                    value={formData.next_hearing_date}
                    onChange={(e) => handleInputChange('next_hearing_date', e.target.value)}
                    className="form-input"
                  />
                  {errors.next_hearing_date && (
                    <p className="mt-1 text-sm text-red-600 bengali">{errors.next_hearing_date}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  মামলার বিবরণ
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="form-input bengali"
                  placeholder="মামলার বিস্তারিত বিবরণ"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  নোটস/মন্তব্য
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="form-input bengali"
                  placeholder="অতিরিক্ত নোট বা মন্তব্য"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors bengali"
                >
                  ← পূর্ববর্তী
                </button>
                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors bengali"
                  >
                    বাতিল করুন
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bengali"
                  >
                    {loading ? (
                      <>
                        <div className="spinner inline-block mr-2"></div>
                        সংরক্ষণ হচ্ছে...
                      </>
                    ) : (
                      'মামলা সংরক্ষণ করুন'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
