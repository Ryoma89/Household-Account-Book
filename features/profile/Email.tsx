'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '@/app/loading'
import * as z from 'zod'
import { useToast } from "@/components/ui/use-toast";
import { Database } from '@/lib/database.types2'

type Schema = z.infer<typeof schema>

// Define validation rules for input data
const schema = z.object({
  email: z.string().email({ message: 'Invalid email format.' }),
})

// Change email address
const Email = ({ email }: { email: string }) => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const { toast } = useToast();
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Initial values
    defaultValues: { email: '' },
    // Input validation
    resolver: zodResolver(schema),
  })

  // Submit
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // Send email address change email
      const { error: updateUserError } = await supabase.auth.updateUser(
        { email: data.email },
        { emailRedirectTo: `${location.origin}/auth/login` }
      )

      // Error check
      if (updateUserError) {
        toast({
          title: 'Error',
          description: 'An error occurred: ' + updateUserError.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Email Sent',
        description: 'An email with a confirmation URL has been sent.',
      });

      // Logout
      await supabase.auth.signOut();

      router.push('/auth/login')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred: ' + error,
        variant: 'destructive',
      });
      return;
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">Change Email Address</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Current email address */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">Current Email Address</div>
          <div>{email}</div>
        </div>

        {/* New email address */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">New Email Address</div>
          <input
            type="email"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="New Email Address"
            id="email"
            {...register('email', { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">{errors.email?.message}</div>
        </div>

        {/* Change button */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-buttonPrimary hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              Change
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Email
