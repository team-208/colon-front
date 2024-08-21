import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { UpdatePostReactionsRequest } from './type';

export async function PUT(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as UpdatePostReactionsRequest;

  try {
    let reactionsCount = 0;
    Object.values(bodyData.reactions).forEach((count) => {
      reactionsCount += count;
    });

    const { error } = await supabase
      .from('posts')
      .update({ reactions: JSON.stringify(bodyData.reactions), reaction_count: reactionsCount })
      .eq('id', bodyData.postId);

    return NextResponse.json({ success: error ? false : true, error });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
