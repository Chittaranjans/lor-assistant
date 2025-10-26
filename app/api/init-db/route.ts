import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db';

export async function GET() {
  try {
    // Test connection
    const isConnected = await testConnection();
    if (!isConnected) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // Note: Tables are created manually in Supabase dashboard
    return NextResponse.json({ message: 'Database connection successful. Tables should be created in Supabase dashboard.' });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ error: 'Failed to test database connection' }, { status: 500 });
  }
}