'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currencies } from "@/constants/currencies";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/loading";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

type Schema = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  primary_currency: z
    .string()
    .min(3, { message: "Please select a primary currency." }),
});

const SignupForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      primary_currency: "USD",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      const { data: signupData, error: errorSignup } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });

      if (errorSignup) {
        toast({
          title: 'Error',
          description: 'An error occurred: ' + errorSignup.message,
          variant: 'destructive',
        });
        return;
      }

      if (signupData.user) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ name: data.name, primary_currency: data.primary_currency })
          .eq("id", signupData.user.id);

        if (updateError) {
          toast({
            title: 'Error',
            description: 'An error occurred: ' + updateError.message,
            variant: 'destructive',
          });
          return;
        }
      }

      reset();
      toast({
        title: '✅ Success!!',
        description: 'A confirmation email has been sent. Please check your email and click the URL to complete the registration.',
      });
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
        {/* Name */}
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.name?.message}
          </div>
        </div>
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
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
          <div className="my-3 text-center text-sm text-red-500">
            {errors.password?.message}
          </div>
        </div>
        {/* Primary Currency */}
        <div className="mb-5">
          <Label htmlFor="primary_currency">Primary Currency</Label>
          <select
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            {...register("primary_currency", { required: true })}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <div className="my-3 text-center text-sm text-red-500">
            {errors.primary_currency?.message}
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
              Sign Up
            </Button>
          )}
        </div>
      </form>
      <div className="text-center text-sm mt-4">
        <Link
          href="/auth/login"
          className="text-center text-sm mt-4 hover:opacity-70"
        >
          Already have an account? Log in
        </Link>
      </div>
    </>
  );
};

export default SignupForm;
