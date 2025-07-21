import { NextResponse } from 'next/server';
import { getHost } from '@/app/utils/host';
import { AlarmRepository } from './repository';

export async function GET(request: Request, response: Response) {
  const host = getHost();
  const alarmRepository = new AlarmRepository();

  try {
    const { data: userAlarmData, error: userAlarmError } =
      await alarmRepository.getUserAlarmsAuthenticated();

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
    // requireAuth()에서 발생한 인증 에러 처리
    if (error instanceof Error && error.message === 'User not authenticated') {
      return NextResponse.json({ success: false, error: 'User not authenticated' });
    }
    return NextResponse.redirect(`${host}/error/500`);
  }
}
