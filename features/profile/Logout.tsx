'use client'

import { FormEvent, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import { useToast } from "@/components/ui/use-toast";
import { Database } from '@/lib/database.types2'

// Logout
const Logout = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const { toast } = useToast();
  const [loading, setLoading] = useState(false)

  // Submit
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Logout
      const { error } = await supabase.auth.signOut()

      // Error check
      if (error) {
        toast({
          title: 'Error',
          description: 'An error occurred: ' + error.message,
          variant: 'destructive',
        });
        return;
      }

      router.push('/')
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
      <div className="text-center mb-5">Do you want to logout?</div>
      {/* Logout button */}
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-red-500 hover:opacity-80 w-full rounded-full p-2 text-white text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Logout
