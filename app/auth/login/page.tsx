import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "@/features/home/login/Login";
import { Database } from "@/lib/database.types2";

const LoginPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // ユーザー情報の取得
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 認証している場合、リダイレクト
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="pt-10">
      <Login />
    </div>
  );
};

export default LoginPage;
