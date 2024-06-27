'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '@/app/loading'
import { useToast } from "@/components/ui/use-toast";
import * as z from 'zod'
import { Database } from '@/lib/database.types2'
type Schema = z.infer<typeof schema>

const schema = z
  .object({
    password: z.string().min(6, { message: 'Must be at least 6 characters.' }),
    confirmation: z.string().min(6, { message: 'Must be at least 6 characters.' }),
  })
  .refine((data) => data.password === data.confirmation, {
    message: 'New password and confirmation password do not match.',
    path: ['confirmation'], // Apply error message to the field
  })

// Change password
const Password = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const { toast } = useToast();
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { password: '', confirmation: '' },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      })

      if (error) {
        toast({
          title: 'Error',
          description: 'An error occurred: ' + error.message,
          variant: 'destructive',
        });
        return
      }

      reset()
      toast({
        title: '✅ Success',
        description: 'Password has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred: ' + error,
        variant: 'destructive',
      });
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">Change Password</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">New Password</div>
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="New Password"
            id="password"
            {...register('password', { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">{errors.password?.message}</div>
        </div>

        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">Confirmation Password</div>
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="Confirmation Password"
            id="confirmation"
            {...register('confirmation', { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.confirmation?.message}
          </div>
        </div>

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

export default Password
