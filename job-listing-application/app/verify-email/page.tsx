'use client'
import React from 'react'
import VerifyEmail from '../components/VerifyEmail'
import { redirect, useSearchParams } from 'next/navigation'

const VerifyEmailPage = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')


  if (email)
    return (
      <div className='flex justify-center h-screen'>
          <VerifyEmail email={email}></VerifyEmail>
      </div>
    )
  redirect('/signup')
}

export default VerifyEmailPage