import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types2'
type ProfileType = Database['public']['Tables']['profiles']['Row']

type StateType = {
  user: ProfileType
  setUser: (payload: ProfileType) => void;
  fetchUserProfile: (userId: string) => Promise<void>;
}

const useProfileStore = create<StateType>((set) => ({
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

export default useProfileStore