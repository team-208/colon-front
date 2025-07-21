import type { AlarmItemProps } from './type.d.ts';
import { BaseRepository } from '../base.repository';

export class AlarmRepository extends BaseRepository {
  async getUserAlarms(
    userId: string,
    limit: number = 10,
  ): Promise<{
    data: AlarmItemProps[] | null;
    error: any;
  }> {
    const supabase = await this.getSupabaseClient();

    return await supabase
      .from('alarm')
      .select('*')
      .limit(limit)
      .eq('user_id', userId)
      .order('id', { ascending: false });
  }

  // requireAuth()를 사용하는 새로운 메서드
  async getUserAlarmsAuthenticated(limit: number = 10): Promise<{
    data: AlarmItemProps[] | null;
    error: any;
  }> {
    const userId = await this.requireAuth();
    return this.getUserAlarms(userId, limit);
  }

  async createAlarm(alarmData: Omit<AlarmItemProps, 'id' | 'created_at'>): Promise<{
    data: AlarmItemProps | null;
    error: any;
  }> {
    const supabase = await this.getSupabaseClient();

    return await supabase.from('alarm').insert(alarmData).select().single();
  }

  async updateAlarmConfirmation(
    alarmId: number,
    userId: string,
    isConfirmedList?: boolean,
    isConfirmedDetail?: boolean,
  ): Promise<{
    data: AlarmItemProps | null;
    error: any;
  }> {
    const supabase = await this.getSupabaseClient();

    const updateData: any = {};
    if (isConfirmedList !== undefined) updateData.is_confirmed_list = isConfirmedList;
    if (isConfirmedDetail !== undefined) updateData.is_confirmed_detail = isConfirmedDetail;

    return await supabase
      .from('alarm')
      .update(updateData)
      .eq('id', alarmId)
      .eq('user_id', userId)
      .select()
      .single();
  }

  // requireAuth()를 사용하는 새로운 메서드
  async updateAlarmConfirmationAuthenticated(
    alarmId: number,
    isConfirmedList?: boolean,
    isConfirmedDetail?: boolean,
  ): Promise<{
    data: AlarmItemProps | null;
    error: any;
  }> {
    const userId = await this.requireAuth();
    return this.updateAlarmConfirmation(alarmId, userId, isConfirmedList, isConfirmedDetail);
  }

  async deleteAlarm(
    alarmId: number,
    userId: string,
  ): Promise<{
    error: any;
  }> {
    const supabase = await this.getSupabaseClient();

    return await supabase.from('alarm').delete().eq('id', alarmId).eq('user_id', userId);
  }

  // requireAuth()를 사용하는 새로운 메서드
  async deleteAlarmAuthenticated(alarmId: number): Promise<{
    error: any;
  }> {
    const userId = await this.requireAuth();
    return this.deleteAlarm(alarmId, userId);
  }
}
