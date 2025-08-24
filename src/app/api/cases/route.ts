import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface CaseData {
  title: string;
  client_id: string;
  case_type: string;
  status: 'active' | 'pending' | 'closed';
  court_name?: string;
  case_number?: string;
  filing_date?: Date;
  next_hearing?: Date;
  description?: string;
  documents?: string[];
}

export async function GET() {
  try {
    const db = await getDb();
    const cases = await db.collection('cases')
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    // Convert ObjectId to string for frontend and format dates
    const casesWithStringId = cases.map(caseItem => ({
      ...caseItem,
      id: caseItem._id.toString(),
      _id: undefined,
      client_id: caseItem.client_id.toString(),
      created_at: caseItem.created_at.toISOString(),
      filing_date: caseItem.filing_date ? caseItem.filing_date.toISOString() : undefined,
      next_hearing: caseItem.next_hearing ? caseItem.next_hearing.toISOString() : undefined,
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
    if (!caseData.title || !caseData.client_id || !caseData.case_type || !caseData.status) {
      return NextResponse.json(
        { success: false, error: 'সব প্রয়োজনীয় তথ্য দিন' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Validate client exists
    const client = await db.collection('clients').findOne({ _id: new ObjectId(caseData.client_id) });
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'ক্লায়েন্ট খুঁজে পাওয়া যায়নি' },
        { status: 400 }
      );
    }

    // Create new case
    const newCase = {
      ...caseData,
      client_id: new ObjectId(caseData.client_id),
      filing_date: caseData.filing_date ? new Date(caseData.filing_date) : undefined,
      next_hearing: caseData.next_hearing ? new Date(caseData.next_hearing) : undefined,
      created_at: new Date(),
    };

    const result = await db.collection('cases').insertOne(newCase);

    return NextResponse.json({
      success: true,
      message: 'মামলা সফলভাবে যোগ করা হয়েছে',
      case: {
        ...newCase,
        id: result.insertedId.toString(),
        _id: undefined,
        client_id: newCase.client_id.toString(),
        created_at: newCase.created_at.toISOString(),
        filing_date: newCase.filing_date ? newCase.filing_date.toISOString() : undefined,
        next_hearing: newCase.next_hearing ? newCase.next_hearing.toISOString() : undefined,
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
