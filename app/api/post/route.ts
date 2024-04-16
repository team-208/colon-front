import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = await request.json();

  try {
    const { error } = await supabase
      .from('posts')
      .insert([{ ...bodyData, body_url: '', created_at: dayjs(), updated_at: dayjs() }]);
    // TODO: error 처리 프론트 or 백 결정 필요.
    return NextResponse.json({ success: error ? false : true, ...error });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
