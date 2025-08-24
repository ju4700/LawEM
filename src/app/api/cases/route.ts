import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface CaseData {
  case_number: string;
  title_bn: string;
  title_en?: string;
  client_id: string;
  client_name: string;
  case_type: string;
  status: 'pending' | 'active' | 'closed' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  court_name?: string;
  next_hearing?: string;
  description?: string;
}

export async function GET() {
  try {
    const db = await getDb();
    const cases = await db.collection('cases')
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    // Convert ObjectId to string for frontend
    const casesWithStringId = cases.map(caseItem => ({
      ...caseItem,
      id: caseItem._id.toString(),
      _id: undefined,
      created_at: caseItem.created_at.toISOString(),
      updated_at: caseItem.updated_at.toISOString()
    }));

    return NextResponse.json({
      success: true,
      cases: casesWithStringId,
    });
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json({
      success: false,
      error: 'মামলার তথ্য লোড করতে ব্যর্থ',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const caseData: CaseData = body;

    // Validate required fields
    if (!caseData.case_number || !caseData.title_bn || !caseData.client_id || !caseData.client_name || !caseData.case_type || !caseData.status || !caseData.priority) {
      return NextResponse.json(
        { success: false, error: 'সব প্রয়োজনীয় তথ্য দিন' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if case number already exists
    const existingCase = await db.collection('cases').findOne({ case_number: caseData.case_number });
    if (existingCase) {
      return NextResponse.json(
        { success: false, error: 'এই মামলা নম্বর দিয়ে ইতিমধ্যে একটি মামলা আছে' },
        { status: 400 }
      );
    }

    // Create new case
    const newCase = {
      ...caseData,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection('cases').insertOne(newCase);

    return NextResponse.json({
      success: true,
      message: 'মামলা সফলভাবে যোগ করা হয়েছে',
      case: {
        ...newCase,
        id: result.insertedId.toString(),
        _id: undefined,
        created_at: newCase.created_at.toISOString(),
        updated_at: newCase.updated_at.toISOString()
      },
    });
  } catch (error) {
    console.error('Error creating case:', error);
    return NextResponse.json(
      { success: false, error: 'মামলা যোগ করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
