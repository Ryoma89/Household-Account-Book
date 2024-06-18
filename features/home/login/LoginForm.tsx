"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/loading";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

type Schema = z.infer<typeof schema>;

// Define validation rules for input data
const schema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const LoginForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      // Login
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      // Error check
      if (error) {
        toast({
          title: 'Error',
          description: 'An error occurred: ' + error.message,
          variant: 'destructive',
        });
        return;
      }

      // Navigate to the dashboard
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred: ' + error,
        variant: 'destructive',
      });
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500 hidden">
            {errors.email?.message}
          </div>
        </div>
        {/* Password */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            minLength={6}
            id="password"
            type="password"
            placeholder="********"
            {...register("password", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500 hidden">
            {errors.password?.message}
          </div>
        </div>
        <div className="mt-3">
          {loading ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              className="font-bold bg-buttonPrimary w-full rounded-full p-2 text-white text-sm"
            >
              Login
            </Button>
          )}
        </div>
      </form>
      <div className="mt-5">
        <div className="text-center text-sm mb-2">
          <Link
            href="/auth/resetPassword"
            className="text-center text-sm mt-4 hover:opacity-70"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="text-center text-sm">
          <Link
            href="/auth/signup"
            className="text-center text-sm mt-4 hover:opacity-70"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
