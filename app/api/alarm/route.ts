import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';

export async function GET(request: Request, response: Response) {
  const host = getHost();
  const supabase = await createClient(true);

  try {
    const { data: userAlarmData, error: userAlarmError } = await supabase
      .from('alarm')
      .select('*')
      .limit(10)
      .order('id', { ascending: false });

    if (userAlarmError) {
      return NextResponse.json({
        success: false,
        ...userAlarmError,
      });
    }

    return NextResponse.json({
      success: true,
      list: userAlarmData,
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
