import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { InsertPostScrapRequest } from './type';
import { isEmpty } from 'lodash';

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as InsertPostScrapRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const { postId } = bodyData;

      const { data: scrapData, error: getScrapsError } = await supabase
        .from('scraps')
        .select('*')
        .eq('user_id', userId)
        .eq('post_id', postId);

      if (getScrapsError) {
        return NextResponse.json({ success: false, getScrapsError });
      }

      if (!isEmpty(scrapData)) {
        const { error: deleteError } = await supabase
          .from('scraps')
          .delete()
          .eq('user_id', userId)
          .eq('post_id', postId);
        console.log(deleteError);

        if (deleteError) {
          return NextResponse.json({ success: false, deleteError });
        }

        return NextResponse.json({ success: true });
      }

      const { error: insertError } = await supabase.from('scraps').insert({
        user_id: userId,
        post_id: postId,
      });

      if (insertError) {
        return NextResponse.json({ success: false, insertError });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
