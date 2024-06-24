import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = () => {
  return (
    <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Reset Password</CardTitle>
          <CardDescription className='text-center'>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
  )
}

export default ResetPassword
