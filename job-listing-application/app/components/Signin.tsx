"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface SignInFormValues {
  email: string;
  password: string;
}

const Signin = () => {
    const session = useSession();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>({
        mode: 'onBlur'
    });

    const onSubmit = async (data: SignInFormValues) => {
            await signIn('sign-in', {
                
                password: data.password,
                email: data.email,
                callbackUrl:`/landing`
            });
      
    };

    if(session.status === "authenticated")
        router.push('/landing')

    return (
        <div className='py-8 flex w-1/2 flex-col items-center '>
            
            <h1 className='font-heading text-disabled-grey font-black text-3xl'>Welcome Back,</h1>
            <div className="flex items-center space-x-4 mb-8">
                <hr className="flex-1 border-t border-light-grey"/>
                <hr className="flex-1 border-t border-light-grey"/>
            </div>
            
            <div className='w-3/5 md:w-4/7'>

                
                <form onSubmit={handleSubmit(onSubmit)} noValidate>


                    
                    <div className="mb-4">

                        <label className='block full text-light-black font-semibold text-base mb-2' htmlFor="email">Email Address</label>
                        <input
                            placeholder='Enter email address'
                            className='border px-3 w-full font-body font-normal h-12 rounded-md border-light-grey'
                            type="email"
                            // name='email'
                            id='email-address'
                            data-testid="email-field"
                            {...register('email', { 
                                required: {
                                    value: true,
                                    message: "Email is required."
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address",
                                }                   
                             })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className='block full text-light-black font-semibold text-base mb-2' htmlFor="password">Password</label>
                        <input
                            placeholder='Enter password'
                            className='border px-3 w-full font-body font-normal h-12 rounded-md border-light-grey'
                            type="password"
                            id='password'
                            {...register('password', { 
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
                    </div>
                  
                    <button type='submit' className='bg-purple-tag text-white font-body font-normal w-full rounded-full h-12'>
                        Login
                    </button>
                </form>
                <p className='text-grey-subtitle font-body font-normal text-base mt-6 mb-6'>Don't have an account? <Link className='text-purple-tag font-semibold text-base' href='/signup'>Sign Up</Link></p>
                <p className='text-grey-subtitle font-body font-normal text-sm'>By clicking 'Continue', you acknowledge that you have read and accepted our terms of <Link className='text-purple-tag'  href={'/terms-of-service'}>Terms of Service</Link> and <Link className='text-purple-tag '  href={'/privacy-policy'}>Privacy Policy</Link></p>
        </div>
    </div>
  )
}

export default Signin

