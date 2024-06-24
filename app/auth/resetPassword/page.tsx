import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types2";
import ResetPassword from "@/features/profile/resetPassword/ResetPassword";

// パスワードリセットページ
const ResetPasswordPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // ユーザーの取得
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 認証している場合、リダイレクト
  if (user) {
    redirect("/");
  }

  return (
    <div className="pt-10">
        <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
