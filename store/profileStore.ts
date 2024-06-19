import { create } from 'zustand'
import type { Database } from '@/lib/database.types'
import { supabase } from '@/lib/supabase'
type ProfileType = Database['public']['Tables']['profiles']['Row']

type StateType = {
  user: ProfileType
  setUser: (payload: ProfileType) => void;
  fetchUserProfile: (userId: string) => Promise<void>;
}

const useStore = create<StateType>((set) => ({
  // 初期値
  user: { id: '', email: '', name: '', introduce: '', avatar_url: '', primary_currency: '' },
  // アップデート
  setUser: (payload) => set({ user: payload }),
  fetchUserProfile: async (userId: string) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) {
      console.log(error);
    }
    if (data) {
      set({ user: data });
    }
  }
}))

export default useStore