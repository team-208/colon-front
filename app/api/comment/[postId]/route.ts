import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const host = getHost();

  const supabase = await createClient();

  try {
    const { data, error: commentsGetError } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', params.postId);
    if (commentsGetError) {
      return NextResponse.json({
        success: false,
        ...commentsGetError,
      });
    }

    return NextResponse.json({
      success: true,
      data: [...data],
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
