import { getHost } from '@/app/utils/host';
import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

export async function POST(request: Request) {
  const host = getHost();
  const supabase = await createClient(true);
  const bodyData = await request.formData();

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const dateTime = dayjs().format('YYMMDD_HH:mm:ss');
      const profile = bodyData.get('profile') as File;
      const { data, error } = await supabase.storage
        .from('profile')
        .upload(`${userId}/profile_${dateTime}.png`, profile as FormDataEntryValue, {
          upsert: true,
        });

      // TODO: error 처리 프론트 or 백 결정 필요.
      return NextResponse.json({ success: error ? false : true, ...data, ...error });
    }

    // 로그인 에러 발생시 redirect
    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

// ref: https://supabase.com/docs/reference/javascript/admin-api
