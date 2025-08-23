import { NextRequest, NextResponse } from 'next/server';

interface ClientData {
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

// In-memory storage for demo purposes
// eslint-disable-next-line prefer-const
let clients: (ClientData & { id: string; created_at: string })[] = [
  {
    id: '1',
    name_bn: 'মোহাম্মদ রহিম উদ্দিন',
    name_en: 'Mohammad Rahim Uddin',
    nid: '1234567890123',
    phone: '+8801712345678',
    email: 'rahim@example.com',
    district: 'ঢাকা',
    upazila: 'ধানমন্ডি',
    address_details: '১২৩ নং বাড়ি, রোড নং ৫, ধানমন্ডি',
    notes: 'ভালো ক্লায়েন্ট',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name_bn: 'ফাতেমা খাতুন',
    name_en: 'Fatema Khatun',
    nid: '9876543210987',
    phone: '+8801987654321',
    email: 'fatema@example.com',
    district: 'চট্টগ্রাম',
    upazila: 'কোতোয়ালী',
    address_details: '৪৫৬ নং বাড়ি, আগ্রাবাদ',
    notes: 'জরুরি কেস',
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      clients: clients.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { success: false, error: 'ক্লায়েন্ট তালিকা লোড করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientData: ClientData = body;

    // Validate required fields
    if (!clientData.name_bn || !clientData.nid || !clientData.phone || !clientData.district || !clientData.upazila || !clientData.address_details) {
      return NextResponse.json(
        { success: false, error: 'সব প্রয়োজনীয় তথ্য দিন' },
        { status: 400 }
      );
    }

    // Check if NID already exists
    const existingClient = clients.find(c => c.nid === clientData.nid);
    if (existingClient) {
      return NextResponse.json(
        { success: false, error: 'এই জাতীয় পরিচয়পত্র নম্বর দিয়ে ইতিমধ্যে একটি ক্লায়েন্ট আছে' },
        { status: 400 }
      );
    }

    // Create new client
    const newClient = {
      ...clientData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };

    clients.push(newClient);

    return NextResponse.json({
      success: true,
      message: 'ক্লায়েন্ট সফলভাবে যোগ করা হয়েছে',
      client: newClient,
    });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { success: false, error: 'ক্লায়েন্ট যোগ করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
