import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Signup from "@/features/home/signup/Signup";

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
    <div className='pt-10 relative' style={{ height: 'calc(100vh - 88px)'}}>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5'>
      <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
