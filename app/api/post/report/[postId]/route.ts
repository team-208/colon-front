import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';

interface Params {
  postId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const host = getHost();

  const supabase = await createClient();

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;
      const { data, error: reportGetError } = await supabase
        .from('report')
        .select('id, post_id, comment_id, user_nickname, reason, status')
        .eq('user_id', userId)
        .eq('post_id', params.postId);

      if (reportGetError) {
        return NextResponse.json({
          success: false,
          ...reportGetError,
        });
      }

      return NextResponse.json({
        success: true,
        list: data,
      });
    }

    return NextResponse.json({
      success: true,
      isReported: false,
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
