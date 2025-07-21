import type { InsertPostReportRequest, REPORT_STATUS_TYPES } from './type.d.ts';
import type { PostListItem } from '../post/type.d.ts';
import { BaseRepository } from '../base.repository';

export class ReportRepository extends BaseRepository {
  async createPostReport(reportData: InsertPostReportRequest): Promise<{
    data: PostListItem | null;
    error: unknown;
  }> {
    const supabase = await this.getSupabaseClient();

    return await supabase
      .from('report')
      .insert({
        post_id: reportData.postId,
        comment_id: reportData.commentId,
        user_nickname: reportData.userNickname,
        reason: reportData.reason,
        status: reportData.status,
      })
      .select()
      .single();
  }

  // requireAuth()를 사용하는 새로운 메서드
  async createPostReportAuthenticated(
    reportData: Omit<InsertPostReportRequest, 'userNickname'>,
  ): Promise<{
    data: PostListItem | null;
    error: unknown;
  }> {
    const userId = await this.requireAuth();
    const supabase = await this.getSupabaseClient();

    // 사용자 정보 조회
    const { data: userInfo } = await supabase
      .from('user_info')
      .select('nick_name')
      .eq('user_id', userId)
      .single();

    return await supabase
      .from('report')
      .insert({
        user_id: userId,
        post_id: reportData.postId,
        comment_id: reportData.commentId,
        user_nickname: userInfo?.nick_name || 'Unknown',
        reason: reportData.reason,
        status: reportData.status,
      })
      .select()
      .single();
  }

  async getReportedPosts(
    offset: number = 0,
    limit: number = 10,
  ): Promise<{
    data: PostListItem[] | null;
    error: any;
  }> {
    const supabase = await this.getSupabaseClient();

    return await supabase
      .from('report')
      .select(
        `
        *,
        post:post_id(*)
      `,
      )
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });
  }

  // requireAuth()를 사용하는 새로운 메서드 - 사용자별 신고 조회
  async getUserReports(
    offset: number = 0,
    limit: number = 10,
  ): Promise<{
    data: PostListItem[] | null;
    error: any;
  }> {
    const userId = await this.requireAuth();
    const supabase = await this.getSupabaseClient();

    return await supabase
      .from('report')
      .select(
        `
        *,
        post:post_id(*)
      `,
      )
      .eq('user_id', userId)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });
  }

  async updateReportStatus(
    reportId: number,
    status: REPORT_STATUS_TYPES,
  ): Promise<{
    data: PostListItem | null;
    error: unknown;
  }> {
    const supabase = await this.getSupabaseClient();

    return await supabase.from('report').update({ status }).eq('id', reportId).select().single();
  }

  // requireAuth()를 사용하는 새로운 메서드 - 사용자 본인의 신고만 수정
  async updateUserReportStatus(
    reportId: number,
    status: REPORT_STATUS_TYPES,
  ): Promise<{
    data: PostListItem | null;
    error: unknown;
  }> {
    const userId = await this.requireAuth();
    const supabase = await this.getSupabaseClient();

    return await supabase
      .from('report')
      .update({ status })
      .eq('id', reportId)
      .eq('user_id', userId)
      .select()
      .single();
  }

  async deleteReport(reportId: number): Promise<{
    error: any;
  }> {
    const supabase = await this.getSupabaseClient();

    return await supabase.from('report').delete().eq('id', reportId);
  }

  // requireAuth()를 사용하는 새로운 메서드 - 사용자 본인의 신고만 삭제
  async deleteUserReport(reportId: number): Promise<{
    error: any;
  }> {
    const userId = await this.requireAuth();
    const supabase = await this.getSupabaseClient();

    return await supabase.from('report').delete().eq('id', reportId).eq('user_id', userId);
  }
}
