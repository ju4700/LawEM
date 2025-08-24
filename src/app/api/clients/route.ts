import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

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

export async function GET() {
  try {
    const db = await getDb();
    const clients = await db.collection('clients')
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    // Convert ObjectId to string for frontend
    const clientsWithStringId = clients.map(client => ({
      ...client,
      id: client._id.toString(),
      _id: undefined,
      created_at: client.created_at.toISOString()
    }));

    return NextResponse.json({
      success: true,
      clients: clientsWithStringId,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({
      success: false,
      error: 'ক্লায়েন্ট তথ্য লোড করতে ব্যর্থ',
    }, { status: 500 });
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

    const db = await getDb();

    // Check if NID already exists
    const existingClient = await db.collection('clients').findOne({ nid: clientData.nid });
    if (existingClient) {
      return NextResponse.json(
        { success: false, error: 'এই জাতীয় পরিচয়পত্র নম্বর দিয়ে ইতিমধ্যে একটি ক্লায়েন্ট আছে' },
        { status: 400 }
      );
    }

    // Create new client
    const newClient = {
      ...clientData,
      created_at: new Date(),
    };

    const result = await db.collection('clients').insertOne(newClient);

    return NextResponse.json({
      success: true,
      message: 'ক্লায়েন্ট সফলভাবে যোগ করা হয়েছে',
      client: {
        ...newClient,
        id: result.insertedId.toString(),
        _id: undefined,
        created_at: newClient.created_at.toISOString()
      },
    });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { success: false, error: 'ক্লায়েন্ট যোগ করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
