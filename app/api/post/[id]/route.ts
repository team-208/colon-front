import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const host = getHost();

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .limit(1)
      .single();

    return NextResponse.json({ success: error ? false : true, ...data, ...error });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
