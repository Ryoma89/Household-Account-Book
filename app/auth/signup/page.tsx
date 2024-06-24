
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Signup from "@/features/home/signup/Signup";
import { Database } from "@/lib/database.types2";

const SignupPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // ユーザー情報の取得
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className='pt-10'>
      <Signup />
    </div>
  );
};

export default SignupPage;
