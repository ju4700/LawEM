'use client';

import { useState } from 'react';
import { BANGLADESH_DISTRICTS } from '@/types/database';

interface ClientFormData {
  name_bn: string;
  name_en?: string;
  nid: string;
  phone: string;
  email?: string;
  district: string;
  upazila: string;
  address_details: string;
  notes?: string;
}

interface ClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => void;
  loading?: boolean;
}

export default function ClientForm({ isOpen, onClose, onSubmit, loading = false }: ClientFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ClientFormData>({
    name_bn: '',
    name_en: '',
    nid: '',
    phone: '',
    email: '',
    district: '',
    upazila: '',
    address_details: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ClientFormData, string>> = {};

    if (!formData.name_bn.trim()) {
      newErrors.name_bn = 'বাংলা নাম প্রয়োজনীয়';
    }

    if (!formData.nid.trim()) {
      newErrors.nid = 'জাতীয় পরিচয়পত্র নম্বর প্রয়োজনীয়';
    } else if (!/^\d{10}$|^\d{13}$|^\d{17}$/.test(formData.nid)) {
      newErrors.nid = 'বৈধ জাতীয় পরিচয়পত্র নম্বর দিন';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'ফোন নম্বর প্রয়োজনীয়';
    } else if (!/^(\+8801|01)[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'বৈধ বাংলাদেশী ফোন নম্বর দিন';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'বৈধ ইমেইল ঠিকানা দিন';
    }

    if (!formData.district) {
      newErrors.district = 'জেলা নির্বাচন করুন';
    }

    if (!formData.upazila.trim()) {
      newErrors.upazila = 'উপজেলা লিখুন';
    }

    if (!formData.address_details.trim()) {
      newErrors.address_details = 'বিস্তারিত ঠিকানা প্রয়োজনীয়';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Format phone number
    const submissionData = { ...formData };
    if (submissionData.phone && !submissionData.phone.startsWith('+880')) {
      submissionData.phone = submissionData.phone.replace(/^0/, '+880');
    }
    
    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name_bn: '',
      name_en: '',
      nid: '',
      phone: '',
      email: '',
      district: '',
      upazila: '',
      address_details: '',
      notes: '',
    });
    setErrors({});
    setCurrentStep(1);
    onClose();
  };

  const nextStep = () => {
    // Validate step 1 fields before proceeding
    const step1Fields = ['name_bn', 'nid', 'phone'] as const;
    const step1Errors: Partial<Record<keyof ClientFormData, string>> = {};
    
    step1Fields.forEach(field => {
      if (!formData[field].trim()) {
        switch (field) {
          case 'name_bn':
            step1Errors.name_bn = 'বাংলা নাম প্রয়োজনীয়';
            break;
          case 'nid':
            step1Errors.nid = 'জাতীয় পরিচয়পত্র নম্বর প্রয়োজনীয়';
            break;
          case 'phone':
            step1Errors.phone = 'ফোন নম্বর প্রয়োজনীয়';
            break;
        }
      }
    });

    if (formData.nid && !/^\d{10}$|^\d{13}$|^\d{17}$/.test(formData.nid)) {
      step1Errors.nid = 'বৈধ জাতীয় পরিচয়পত্র নম্বর দিন';
    }

    if (formData.phone && !/^(\+8801|01)[3-9]\d{8}$/.test(formData.phone)) {
      step1Errors.phone = 'বৈধ বাংলাদেশী ফোন নম্বর দিন';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      step1Errors.email = 'বৈধ ইমেইল ঠিকানা দিন';
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
            <h3 className="text-xl font-semibold text-gray-900 bengali">নতুন ক্লায়েন্ট যোগ করুন</h3>
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
              
              {/* Bengali Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  পূর্ণ নাম (বাংলা) *
                </label>
                <input
                  type="text"
                  value={formData.name_bn}
                  onChange={(e) => handleInputChange('name_bn', e.target.value)}
                  className="form-input bengali"
                  placeholder="যেমন: মোহাম্মদ রহিম উদ্দিন"
                />
                {errors.name_bn && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.name_bn}</p>
                )}
              </div>

              {/* English Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  নাম (ইংরেজি)
                </label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => handleInputChange('name_en', e.target.value)}
                  className="form-input"
                  placeholder="Mohammad Rahim Uddin"
                />
              </div>

              {/* NID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  জাতীয় পরিচয়পত্র নম্বর *
                </label>
                <input
                  type="text"
                  value={formData.nid}
                  onChange={(e) => handleInputChange('nid', e.target.value)}
                  className="form-input"
                  placeholder="১০/১৩/১৭ ডিজিটের NID নম্বর"
                  maxLength={17}
                />
                {errors.nid && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.nid}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  ফোন নম্বর *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="form-input"
                  placeholder="01712345678 অথবা +8801712345678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  ইমেইল ঠিকানা
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.email}</p>
                )}
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors bengali"
                >
                  পরবর্তী ধাপ →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Address and Notes */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 bengali mb-4">ঠিকানা ও অন্যান্য তথ্য</h4>
              
              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  জেলা *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="form-input bengali"
                >
                  <option value="">জেলা নির্বাচন করুন</option>
                  {BANGLADESH_DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.district}</p>
                )}
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  উপজেলা/থানা *
                </label>
                <input
                  type="text"
                  value={formData.upazila}
                  onChange={(e) => handleInputChange('upazila', e.target.value)}
                  className="form-input bengali"
                  placeholder="যেমন: ধানমন্ডি, রমনা, ওয়ারী"
                />
                {errors.upazila && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.upazila}</p>
                )}
              </div>

              {/* Address Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 bengali mb-1">
                  বিস্তারিত ঠিকানা *
                </label>
                <textarea
                  value={formData.address_details}
                  onChange={(e) => handleInputChange('address_details', e.target.value)}
                  rows={3}
                  className="form-input bengali"
                  placeholder="বাড়ি নম্বর, রোড নম্বর, এলাকার নাম"
                />
                {errors.address_details && (
                  <p className="mt-1 text-sm text-red-600 bengali">{errors.address_details}</p>
                )}
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
                  placeholder="ক্লায়েন্ট সম্পর্কে অতিরিক্ত তথ্য বা মন্তব্য"
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
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bengali"
                  >
                    {loading ? (
                      <>
                        <div className="spinner inline-block mr-2"></div>
                        সংরক্ষণ হচ্ছে...
                      </>
                    ) : (
                      'ক্লায়েন্ট সংরক্ষণ করুন'
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
