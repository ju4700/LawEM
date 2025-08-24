import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function POST(request: NextRequest) {
  try {
    // Check for authorization (simple API key check)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer seed-key-123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await seedDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: result
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
