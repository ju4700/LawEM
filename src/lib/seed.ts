import { getDb } from './db';
import { ObjectId } from 'mongodb';

interface Client {
  _id?: ObjectId;
  name_bn: string;
  name_en?: string;
  nid: string;
  phone: string;
  email?: string;
  district: string;
  upazila: string;
  address_details: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

interface Case {
  _id?: ObjectId;
  case_number: string;
  title_bn: string;
  title_en?: string;
  client_id: ObjectId;
  client_name: string;
  case_type: string;
  status: 'pending' | 'active' | 'closed' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  court_name?: string;
  next_hearing?: Date;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export async function seedDatabase() {
  try {
    const db = await getDb();
    
    // Clear existing data
    await db.collection('clients').deleteMany({});
    await db.collection('cases').deleteMany({});
    
    // Sample clients
    const clients: Client[] = [
      {
        name_bn: 'মোহাম্মদ আব্দুল করিম',
        name_en: 'Mohammad Abdul Karim',
        nid: '1234567890123',
        phone: '01712345678',
        email: 'karim@email.com',
        district: 'ঢাকা',
        upazila: 'ধানমন্ডি',
        address_details: 'বাড়ি নং ১২, রোড নং ৫, ধানমন্ডি',
        notes: 'গুরুত্বপূর্ণ ক্লায়েন্ট - সময়মতো যোগাযোগ করুন',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15')
      },
      {
        name_bn: 'ফাতেমা খাতুন',
        name_en: 'Fatema Khatun',
        nid: '9876543210987',
        phone: '01823456789',
        email: 'fatema@email.com',
        district: 'চট্টগ্রাম',
        upazila: 'নাসিরাবাদ',
        address_details: 'বাড়ি নং ২৫, নাসিরাবাদ আবাসিক এলাকা',
        notes: 'পারিবারিক মামলার ক্লায়েন্ট',
        created_at: new Date('2024-01-20'),
        updated_at: new Date('2024-01-20')
      },
      {
        name_bn: 'আহমেদ হাসান',
        name_en: 'Ahmed Hasan',
        nid: '5678901234567',
        phone: '01934567890',
        email: 'ahmed@email.com',
        district: 'সিলেট',
        upazila: 'সিলেট সদর',
        address_details: 'বাড়ি নং ৮, তিলাগড়, সিলেট',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-01')
      },
      {
        name_bn: 'রহিমা বেগম',
        name_en: 'Rahima Begum',
        nid: '3456789012345',
        phone: '01645678901',
        district: 'রাজশাহী',
        upazila: 'রাজশাহী সদর',
        address_details: 'গ্রাম: কামারপাড়া, পোস্ট: রাজশাহী সদর',
        notes: 'ভূমি সংক্রান্ত মামলা',
        created_at: new Date('2024-02-10'),
        updated_at: new Date('2024-02-10')
      },
      {
        name_bn: 'নাসির উদ্দিন',
        name_en: 'Nasir Uddin',
        nid: '7890123456789',
        phone: '01756789012',
        email: 'nasir@email.com',
        district: 'খুলনা',
        upazila: 'খুলনা সদর',
        address_details: 'বাড়ি নং ১৫, রয়েল রোড, খুলনা',
        created_at: new Date('2024-02-15'),
        updated_at: new Date('2024-02-15')
      }
    ];

    // Insert clients
    const clientResult = await db.collection('clients').insertMany(clients);
    const clientIds = Object.values(clientResult.insertedIds);

    // Sample cases
    const cases: Case[] = [
      {
        case_number: 'CC-2024-001',
        title_bn: 'ভূমি বিরোধ মামলা',
        title_en: 'Land Dispute Case',
        client_id: clientIds[0],
        client_name: 'মোহাম্মদ আব্দুল করিম',
        case_type: 'দেওয়ানি',
        status: 'active',
        priority: 'high',
        court_name: 'ঢাকা জজ আদালত',
        next_hearing: new Date('2024-03-15'),
        description: 'পৈতৃক ভূমির মালিকানা নিয়ে বিরোধ। প্রতিপক্ষ জোরপূর্বক দখল নিয়েছে।',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-02-20')
      },
      {
        case_number: 'CR-2024-002',
        title_bn: 'ফৌজদারি মামলা',
        title_en: 'Criminal Case',
        client_id: clientIds[1],
        client_name: 'ফাতেমা খাতুন',
        case_type: 'ফৌজদারি',
        status: 'pending',
        priority: 'medium',
        court_name: 'চট্টগ্রাম জজ আদালত',
        next_hearing: new Date('2024-03-25'),
        description: 'চুরির অভিযোগে মামলা। সাক্ষী-প্রমাণ সংগ্রহের কাজ চলছে।',
        created_at: new Date('2024-01-20'),
        updated_at: new Date('2024-02-18')
      },
      {
        case_number: 'FC-2024-003',
        title_bn: 'পারিবারিক মামলা',
        title_en: 'Family Case',
        client_id: clientIds[2],
        client_name: 'আহমেদ হাসান',
        case_type: 'পারিবারিক',
        status: 'active',
        priority: 'low',
        court_name: 'সিলেট পারিবারিক আদালত',
        next_hearing: new Date('2024-03-10'),
        description: 'বিবাহ বিচ্ছেদের মামলা। উভয় পক্ষের মধ্যে আলোচনা চলছে।',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-15')
      },
      {
        case_number: 'LC-2024-004',
        title_bn: 'ভূমি মামলা',
        title_en: 'Land Case',
        client_id: clientIds[3],
        client_name: 'রহিমা বেগম',
        case_type: 'দেওয়ানি',
        status: 'won',
        priority: 'medium',
        court_name: 'রাজশাহী জজ আদালত',
        description: 'ভূমির দলিল সংক্রান্ত মামলা। আদালত আমাদের পক্ষে রায় দিয়েছেন।',
        created_at: new Date('2024-02-10'),
        updated_at: new Date('2024-02-28')
      },
      {
        case_number: 'BC-2024-005',
        title_bn: 'ব্যবসায়িক মামলা',
        title_en: 'Business Case',
        client_id: clientIds[4],
        client_name: 'নাসির উদ্দিন',
        case_type: 'দেওয়ানি',
        status: 'active',
        priority: 'high',
        court_name: 'খুলনা জজ আদালত',
        next_hearing: new Date('2024-03-20'),
        description: 'চুক্তি ভঙ্গের কারণে ক্ষতিপূরণের মামলা।',
        created_at: new Date('2024-02-15'),
        updated_at: new Date('2024-02-22')
      },
      {
        case_number: 'TC-2024-006',
        title_bn: 'ট্রাফিক মামলা',
        title_en: 'Traffic Case',
        client_id: clientIds[0],
        client_name: 'মোহাম্মদ আব্দুল করিম',
        case_type: 'ফৌজদারি',
        status: 'closed',
        priority: 'low',
        court_name: 'ঢাকা ট্রাফিক ট্রাইব্যুনাল',
        description: 'ট্রাফিক আইন লঙ্ঘনের মামলা। জরিমানা পরিশোধ করা হয়েছে।',
        created_at: new Date('2024-01-25'),
        updated_at: new Date('2024-02-05')
      }
    ];

    // Insert cases
    await db.collection('cases').insertMany(cases);

    console.log('Database seeded successfully!');
    console.log(`Inserted ${clients.length} clients and ${cases.length} cases`);

    return {
      clients: clients.length,
      cases: cases.length
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
