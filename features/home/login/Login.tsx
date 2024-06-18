import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
  )
}

export default Login
