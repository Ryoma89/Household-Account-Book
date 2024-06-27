import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

import Logout from '@/features/profile/Logout'
import { Database } from '@/lib/database.types2'

// ログアウトページ
const LogoutPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // ユーザーの取得
  const { data: { user }, error } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect('/auth/login')
  }

  return <Logout />
}

export default LogoutPage
