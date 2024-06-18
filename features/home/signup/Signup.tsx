import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import SignupForm from './SignupForm'

const Signup = () => {
  return (
    <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Sign Up</CardTitle>
          <CardDescription>
            Enter your email and password below to sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
  )
}

export default Signup
