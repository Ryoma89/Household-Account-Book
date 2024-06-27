import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

import Password from '@/features/profile/Password'
import { Database } from '@/lib/database.types2'

// パスワード変更ページ
const PasswordPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // ユーザーの取得
  const { data: { user }, error } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect('/auth/login')
  }

  return <Password />
}

export default PasswordPage
