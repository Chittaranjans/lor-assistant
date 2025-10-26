import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get letters with pagination
    const { data: letters, error: lettersError } = await supabase
      .from('letters')
      .select('id, type, title, tone, lor_type, strength, word_count, created_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (lettersError) throw lettersError;

    // Get total count
    const { count, error: countError } = await supabase
      .from('letters')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    return NextResponse.json({
      letters,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (offset + limit) < (count || 0)
      }
    });
  } catch (error) {
    console.error('Failed to fetch letters:', error);
    return NextResponse.json({ error: 'Failed to fetch letters' }, { status: 500 });
  }
}