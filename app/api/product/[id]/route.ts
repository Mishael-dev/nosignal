import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ✅ GET SINGLE PRODUCT
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("paroduct id", id)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_SECRET_KEY!
    );

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single(); // 👈 ensures only one record

    if (error) {
      return NextResponse.json(
        { error: 'Product not found', message: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: data });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
