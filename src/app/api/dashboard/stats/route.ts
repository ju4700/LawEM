import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import jwt from 'jsonwebtoken';

// Helper function to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: 'অননুমোদিত অ্যাক্সেস' },
        { status: 401 }
      );
    }

    const db = await getDb();

    // Get client statistics
    const totalClientsPromise = db.collection('clients').countDocuments();
    const activeClientsPromise = db.collection('clients').countDocuments();

    // Get case statistics  
    const totalCasesPromise = db.collection('cases').countDocuments();
    const activeCasesPromise = db.collection('cases').countDocuments({ 
      status: { $in: ['pending', 'active'] } 
    });

    // Get upcoming hearings (next 30 days)
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    
    const upcomingHearingsPromise = db.collection('cases').countDocuments({
      next_hearing: { 
        $gte: today, 
        $lte: nextMonth 
      },
      status: { $in: ['pending', 'active'] }
    });

    // Execute all queries in parallel
    const [
      totalClients,
      activeClients,
      totalCases,
      activeCases,
      upcomingHearings
    ] = await Promise.all([
      totalClientsPromise,
      activeClientsPromise,
      totalCasesPromise,
      activeCasesPromise,
      upcomingHearingsPromise
    ]);

    const stats = {
      totalClients,
      activeClients,
      totalCases,
      activeCases,
      upcomingHearings
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { 
        message: 'ডেটাবেস সংযোগে সমস্যা',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
