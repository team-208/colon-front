import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const host = getHost();

  const supabase = await createClient();

  try {
    const { data, error: postGetError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .limit(1)
      .single();

    if (postGetError) {
      return NextResponse.json({
        success: false,
        ...postGetError,
      });
    }

    const { data: postsData, error: postsError } = await supabase.storage
      .from('posts')
      .download(`${data.body_url}`);

    if (postsError) {
      return NextResponse.json({
        success: false,
        postsError,
      });
    }

    const bodyData = await postsData?.text();
    return NextResponse.json({
      success: true,
      ...data,
      body: bodyData,
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = await request.json();

  try {
    const { error } = await supabase
      .from('posts')
      .update({ ...bodyData, updated_at: dayjs() })
      .eq('id', params.id);

    return NextResponse.json({ success: error ? false : true, error });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
