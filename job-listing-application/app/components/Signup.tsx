"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignupMutation } from '../api/apiSlice';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';
import Error from './Error';

interface SignUpFormValues {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
    const session = useSession();
    const [signup, {isLoading, isSuccess, isError, data: signupData}] = useSignupMutation()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        
    } = useForm<SignUpFormValues>({mode: "onBlur"});
    const router = useRouter()
    

    const onSubmit = async (data: SignUpFormValues) => {
        
        await signup({
            name: data.fullname,
            password: data.password,
            confirmPassword: data.confirmPassword,
            role: "user",
            email: data.email,
        })
    };

    const validatePassword = (value: string) => {
        if(value.length < 6){
            return "Password must be atleast six characters long"
        }
        const hasLetter = /[a-zA-Z]/.test(value);
        if (!hasLetter) {
            return "Password must include at least one letter";
        }
        
        const hasNumber = /[0-9]/.test(value);
        if (!hasNumber) {
            return "Password must include at least one number";
        }
        
        return true;
        
    }

    if(isLoading)
        return <Spinner />

    if(isSuccess){
        router.push(`/verify-email?email=${watch('email')}`)
    }
    
    if(isError)
        return <Error message='Error signing you up. Try again later' />

    return (
        <div className='py-8 flex flex-col items-center'>
            
            <h1 className='font-heading text-dark-blue font-black text-3xl'>Sign Up Today!</h1>

            <div className='w-2/4 md:w-4/7'>
                <button
                    className='flex gap-4 justify-center mb-8 border font-body font-bold text-base h-12 w-full border-brighter-grey text-purple-tag rounded-md mt-6 p-4 hover:shadow-md hover:shadow-gray-100'
                    onClick={() => signIn('google', { callbackUrl: '/landing' })}
                >
                    <span>  
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6712 8.36788H18V8.33329H10.5V11.6666H15.2096C14.5225 13.607 12.6762 15 10.5 15C7.73874 15 5.49999 12.7612 5.49999 9.99996C5.49999 7.23871 7.73874 4.99996 10.5 4.99996C11.7746 4.99996 12.9342 5.48079 13.8171 6.26621L16.1742 3.90913C14.6858 2.52204 12.695 1.66663 10.5 1.66663C5.89791 1.66663 2.16666 5.39788 2.16666 9.99996C2.16666 14.602 5.89791 18.3333 10.5 18.3333C15.1021 18.3333 18.8333 14.602 18.8333 9.99996C18.8333 9.44121 18.7758 8.89579 18.6712 8.36788Z" fill="#FFC107"/>
                            <path d="M3.12749 6.12121L5.8654 8.12913C6.60624 6.29496 8.4004 4.99996 10.5 4.99996C11.7746 4.99996 12.9342 5.48079 13.8171 6.26621L16.1742 3.90913C14.6858 2.52204 12.695 1.66663 10.5 1.66663C7.29915 1.66663 4.52332 3.47371 3.12749 6.12121Z" fill="#FF3D00"/>
                            <path d="M10.5 18.3333C12.6525 18.3333 14.6083 17.5095 16.0871 16.17L13.5079 13.9875C12.6432 14.6451 11.5865 15.0008 10.5 15C8.33251 15 6.49209 13.6179 5.79876 11.6891L3.08126 13.7829C4.46043 16.4816 7.26126 18.3333 10.5 18.3333Z" fill="#4CAF50"/>
                            <path d="M18.6713 8.36796H18V8.33337H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.988L13.5079 13.9871L16.0871 16.1696C15.9046 16.3355 18.8333 14.1667 18.8333 10C18.8333 9.44129 18.7758 8.89587 18.6713 8.36796Z" fill="#1976D2"/>
                        </svg>
                    </span>
                    Sign Up with Google
                </button>

                <div className="flex items-center space-x-4 mb-8">
                    <hr className="flex-1 border-t border-light-grey"/>
                    <span className="whitespace-nowrap text-gray-700">Or Sign Up with Email</span>
                    <hr className="flex-1 border-t border-light-grey"/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label className='block full text-light-black font-semibold text-base mb-2' htmlFor="fullname">Full Name</label>
                        <input
                            placeholder='Enter your full name'
                            className={`border px-3 w-full font-body font-normal h-12 rounded-md border-light-grey ${errors.fullname ? "border-red-500" : ""}`}
                            type="text"
                            id='fullname'
                            {...register('fullname', { 
                                required: {
                                    value: true,
                                    message: 'Full Name is required'
                                },
                            })}
                        />
                        {errors.fullname && <p className="text-red-500 text-sm mt-2">{errors.fullname.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className='block full text-light-black font-semibold text-base mb-2' htmlFor="email">Email Address</label>
                        <input
                            placeholder='Enter email address'
                            className={`border px-3 w-full font-body font-normal h-12 rounded-md border-light-grey ${errors.email ? "border-red-500" : ""}`}
                            type="email"
                            id='email-address'
                            {...register('email', { 
                                required: {
                                    value: true,
                                    message: "Email is required."
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address",
                                }                 
                             },
                            )}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className='block full text-light-black font-semibold text-base mb-2' htmlFor="password">Password</label>
                        <input
                            placeholder='Enter password'
                            className={`border px-3 w-full font-body font-normal h-12 rounded-md border-light-grey ${errors.password ? "border-red-500" : ""}`}
                            type="password"
                            id='password'
                            {...register('password', { 
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                validate: (value) => validatePassword(value)
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className='block full text-light-black font-semibold text-base mb-2' htmlFor="confirm-password">Confirm Password</label>
                        <input
                            placeholder='Enter password again'
                            className={`border px-3 w-full font-body font-normal h-12 rounded-md border-light-grey ${errors.confirmPassword ? "border-red-500" : ""}`}
                            type="password"
                            id='confirm-password'
                            {...register('confirmPassword', {
                                required: {
                                    value: true,
                                    message: 'Confirm Password is required'
                                },
                                validate: (value) =>
                                    value === watch('password') || 'Passwords do not match',
                            })}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type='submit' className='bg-purple-tag hover:shadow-md hover:shadow-gray-500 text-white font-body font-normal w-full rounded-full h-12'>
                        Continue
                    </button>
                </form>
                <p className='text-grey-subtitle font-body font-normal text-base mt-6 mb-6'>Already have an account? <Link className='text-purple-tag font-semibold text-base' href='/signin'>Login</Link></p>
                <p className='text-grey-subtitle font-body font-normal text-sm'>By clicking 'Continue', you acknowledge that you have read and accepted our terms of <Link className='text-purple-tag'  href={'/terms-of-service'}>Terms of Service</Link> and <Link className='text-purple-tag '  href={'/privacy-policy'}>Privacy Policy</Link></p>
        </div>
    </div>
  )
}

export default Signup

