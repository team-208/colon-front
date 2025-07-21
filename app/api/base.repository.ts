import { createClient } from '@/app/utils/supabase/server';

export abstract class BaseRepository {
  protected supabase: Awaited<ReturnType<typeof createClient>> | null;

  constructor() {
    this.supabase = null;
  }

  protected async getSupabaseClient() {
    if (!this.supabase) {
      this.supabase = await createClient(true);
    }
    return this.supabase;
  }

  async getUserSession() {
    const supabase = await this.getSupabaseClient();
    return await supabase.auth.getSession();
  }

  async getUserId(): Promise<string | null> {
    const { data, error } = await this.getUserSession();
    if (error || !data.session) {
      return null;
    }
    return data.session.user.id;
  }

  protected async requireAuth(): Promise<string> {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return userId;
  }
}
