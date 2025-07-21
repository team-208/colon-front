import { NextResponse } from 'next/server';
import { getHost } from '@/app/utils/host';
import { InsertPostReportRequest } from './type';
import { ReportRepository } from './repository';

export async function POST(request: Request) {
  const host = getHost();
  const reportRepository = new ReportRepository();
  const bodyData = (await request.json()) as InsertPostReportRequest;

  try {
    const { error: insertError } = await reportRepository.createPostReportAuthenticated(bodyData);
    if (insertError) {
      return NextResponse.json({ success: false, insertError });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // requireAuth()에서 발생한 인증 에러 처리
    if (error instanceof Error && error.message === 'User not authenticated') {
      return NextResponse.json({ success: false, error: 'User not authenticated' });
    }
    return NextResponse.redirect(`${host}/error/500`);
  }
}

// requireAuth()를 사용하는 새로운 엔드포인트 - 사용자 인증 후 자동으로 닉네임 설정
export async function PUT(request: Request) {
  const host = getHost();
  const reportRepository = new ReportRepository();
  const bodyData = (await request.json()) as Omit<InsertPostReportRequest, 'userNickname'>;

  try {
    const { error: insertError } = await reportRepository.createPostReportAuthenticated(bodyData);
    if (insertError) {
      return NextResponse.json({ success: false, insertError });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // requireAuth()에서 발생한 인증 에러 처리
    if (error instanceof Error && error.message === 'User not authenticated') {
      return NextResponse.json({ success: false, error: 'User not authenticated' });
    }
    return NextResponse.redirect(`${host}/error/500`);
  }
}

// 사용자별 신고 조회 엔드포인트
export async function GET(request: Request) {
  const host = getHost();
  const reportRepository = new ReportRepository();

  try {
    const { data: userReports, error: userReportsError } = await reportRepository.getUserReports();

    if (userReportsError) {
      return NextResponse.json({ success: false, userReportsError });
    }

    return NextResponse.json({
      success: true,
      list: userReports,
    });
  } catch (error) {
    // requireAuth()에서 발생한 인증 에러 처리
    if (error instanceof Error && error.message === 'User not authenticated') {
      return NextResponse.json({ success: false, error: 'User not authenticated' });
    }
    return NextResponse.redirect(`${host}/error/500`);
  }
}
