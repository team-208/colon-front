import { getHost } from '@/app/utils/host';
import { createClient } from '@/app/utils/supabase/server';
import { sample } from 'lodash';
import { NextResponse } from 'next/server';

export async function GET(request: Request, response: Response) {
  const host = getHost();
  const supabase = await createClient(true);

  try {
    const { data: nickNameWordsData, error: nickNameWordsError } = await supabase
      .from('nickname_word')
      .select('type, word');
    if (nickNameWordsError) {
      return NextResponse.json({
        success: false,
        ...nickNameWordsError,
      });
    }

    const abjectiveWord = sample(nickNameWordsData.filter(({ type }) => type === 'abjective'));
    const animalWord = sample(nickNameWordsData.filter(({ type }) => type === 'animal'));

    // TODO: error 처리 프론트 or 백 결정 필요.
    return NextResponse.json({
      success: true,
      nickname: `${abjectiveWord?.word} ${animalWord?.word}`,
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
