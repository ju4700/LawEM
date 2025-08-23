import { ObjectId } from 'mongodb';

// Client Schema - ক্লায়েন্ট স্কিমা
export interface Client {
  _id?: ObjectId;
  name_bn: string; // পূর্ণ নাম (Bengali)
  name_en?: string; // Optional English name
  nid: string; // জাতীয় পরিচয়পত্র নম্বর (12-digit)
  phone: string; // ফোন নম্বর (+880 format)
  email?: string; // ইমেইল
  address: {
    district: string; // জেলা
    upazila: string; // উপজেলা
    details: string; // বিস্তারিত
  };
  case_history: ObjectId[]; // মামলার ইতিহাস
  notes?: string; // নোটস
  status: 'active' | 'inactive'; // সক্রিয় | নিষ্ক্রিয়
  created_at: Date;
  updated_at: Date;
}

// Case Schema - মামলা স্কিমা
export interface Case {
  _id?: ObjectId;
  case_number: string; // মামলা নম্বর
  court: string; // আদালত
  type: 'civil' | 'criminal' | 'family' | 'commercial'; // দেওয়ানী | ফৌজদারি | পারিবারিক | বাণিজ্যিক
  status: 'pending' | 'ongoing' | 'completed' | 'appealed'; // বিচারাধীন | চলমান | সমাপ্ত | আপিল
  sections: string[]; // CrPC/IPC ধারা
  wakalatnama?: ObjectId; // ওয়াকালাতনামা (document reference)
  clients: ObjectId[]; // ক্লায়েন্ট তালিকা
  documents: ObjectId[]; // দলিল তালিকা
  description?: string; // বিবরণ
  filing_date: Date; // দাখিলের তারিখ
  created_at: Date;
  updated_at: Date;
}

// Communication Schema - যোগাযোগ স্কিমা
export interface Communication {
  _id?: ObjectId;
  client_id: ObjectId; // ক্লায়েন্ট আইডি
  case_id?: ObjectId; // মামলা আইডি (optional)
  type: 'email' | 'call' | 'meeting' | 'sms'; // ইমেইল | কল | মিটিং | এসএমএস
  subject?: string; // বিষয়
  details: string; // বিস্তারিত
  timestamp: Date; // সময়
  status: 'sent' | 'received' | 'scheduled'; // পাঠানো | গৃহীত | নির্ধারিত
  created_at: Date;
}

// Calendar/Schedule Schema - ক্যালেন্ডার স্কিমা
export interface Schedule {
  _id?: ObjectId;
  title: string; // শিরোনাম
  description?: string; // বিবরণ
  date: Date; // তারিখ
  start_time: string; // শুরুর সময়
  end_time: string; // শেষের সময়
  type: 'appointment' | 'hearing' | 'task' | 'reminder'; // নিয়োগ | শুনানি | কাজ | স্মারক
  client_id?: ObjectId; // ক্লায়েন্ট আইডি
  case_id?: ObjectId; // মামলা আইডি
  status: 'scheduled' | 'completed' | 'cancelled'; // নির্ধারিত | সম্পন্ন | বাতিল
  reminder_sent: boolean; // স্মারক পাঠানো হয়েছে
  created_at: Date;
  updated_at: Date;
}

// Document Schema - দলিল স্কিমা
export interface Document {
  _id?: ObjectId;
  filename: string; // ফাইলের নাম
  original_name: string; // মূল নাম
  file_path: string; // ফাইল পাথ
  file_size: number; // ফাইলের আকার
  mime_type: string; // MIME টাইপ
  case_id?: ObjectId; // মামলা আইডি
  client_id?: ObjectId; // ক্লায়েন্ট আইডি
  document_type: 'wakalatnama' | 'petition' | 'evidence' | 'order' | 'other'; // ওয়াকালাতনামা | আবেদনপত্র | প্রমাণ | আদেশ | অন্যান্য
  version: number; // সংস্করণ
  is_encrypted: boolean; // এনক্রিপ্ট করা
  tags: string[]; // ট্যাগ
  upload_date: Date; // আপলোডের তারিখ
  updated_at: Date;
}

// User Schema - ব্যবহারকারী স্কিমা
export interface User {
  _id?: ObjectId;
  username: string; // ব্যবহারকারীর নাম
  email: string; // ইমেইল
  password_hash: string; // পাসওয়ার্ড হ্যাশ
  full_name: string; // পূর্ণ নাম
  role: 'lawyer' | 'assistant' | 'admin'; // আইনজীবী | সহকারী | প্রশাসক
  is_active: boolean; // সক্রিয়
  last_login?: Date; // শেষ লগইন
  created_at: Date;
  updated_at: Date;
}

// Audit Log Schema - অডিট লগ স্কিমা
export interface AuditLog {
  _id?: ObjectId;
  user_id: ObjectId; // ব্যবহারকারী আইডি
  action: string; // কার্যক্রম
  resource_type: 'client' | 'case' | 'document' | 'user'; // ক্লায়েন্ট | মামলা | দলিল | ব্যবহারকারী
  resource_id: ObjectId; // রিসোর্স আইডি
  ip_address: string; // আইপি ঠিকানা
  user_agent: string; // ব্যবহারকারী এজেন্ট
  timestamp: Date; // সময়
  details?: Record<string, unknown>; // বিস্তারিত
}

// Bangladesh Districts - বাংলাদেশের জেলা
export const BANGLADESH_DISTRICTS = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',
  'গাজীপুর', 'নারায়ণগঞ্জ', 'কুমিল্লা', 'ফেনী', 'নোয়াখালী', 'লক্ষ্মীপুর', 'চাঁদপুর',
  'ব্রাহ্মণবাড়িয়া', 'হবিগঞ্জ', 'মৌলভীবাজার', 'সুনামগঞ্জ', 'নেত্রকোনা', 'কিশোরগঞ্জ',
  'টাঙ্গাইল', 'জামালপুর', 'শেরপুর', 'রাজবাড়ী', 'মাদারীপুর', 'গোপালগঞ্জ', 'ফরিদপুর',
  'শরীয়তপুর', 'পিরোজপুর', 'ঝালকাঠি', 'পটুয়াখালী', 'বরগুনা', 'ভোলা', 'যশোর',
  'সাতক্ষীরা', 'মেহেরপুর', 'নড়াইল', 'চুয়াডাঙ্গা', 'কুষ্টিয়া', 'মাগুরা', 'বাগেরহাট',
  'নাটোর', 'পাবনা', 'সিরাজগঞ্জ', 'বগুড়া', 'জয়পুরহাট', 'চাঁপাইনবাবগঞ্জ', 'গাইবান্ধা',
  'ঠাকুরগাঁও', 'পঞ্চগড়', 'দিনাজপুর', 'লালমনিরহাট', 'নীলফামারী', 'কুড়িগ্রাম',
  'রাঙামাটি', 'বান্দরবান', 'খাগড়াছড়ি'
];

export const CASE_TYPES = [
  'দেওয়ানি মামলা',
  'ফৌজদারি মামলা',
  'পারিবারিক মামলা',
  'সম্পত্তি বিরোধ',
  'জমি বিরোধ',
  'ব্যাবসায়িক বিরোধ',
  'শ্রম আইন',
  'ভোক্তা অধিকার',
  'বীমা দাবি',
  'ব্যাংক ঋণ',
  'অন্যান্য',
];

export const CASE_STATUS = [
  { value: 'pending', label: 'বিচারাধীন' },
  { value: 'in_progress', label: 'চলমান' },
  { value: 'on_hold', label: 'স্থগিত' },
  { value: 'completed', label: 'সম্পন্ন' },
  { value: 'dismissed', label: 'খারিজ' },
  { value: 'settled', label: 'মীমাংসা' },
];

// Courts in Bangladesh - বাংলাদেশের আদালত
export const BANGLADESH_COURTS = [
  'সুপ্রিম কোর্ট আপিল বিভাগ',
  'সুপ্রিম কোর্ট হাইকোর্ট বিভাগ',
  'ঢাকা জেলা আদালত',
  'চট্টগ্রাম জেলা আদালত',
  'রাজশাহী জেলা আদালত',
  'খুলনা জেলা আদালত',
  'বরিশাল জেলা আদালত',
  'সিলেট জেলা আদালত',
  'রংপুর জেলা আদালত',
  'ময়মনসিংহ জেলা আদালত',
  'পারিবারিক আদালত',
  'দায়রা আদালত',
  'অতিরিক্ত জেলা আদালত',
  'উপজেলা আদালত',
  'শ্রম আদালত',
  'বিশেষ ট্রাইব্যুনাল'
];
