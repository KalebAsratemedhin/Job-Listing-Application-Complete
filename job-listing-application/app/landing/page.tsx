"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Spinner from '../components/Spinner'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'

const LandingPage = () => {
    const session = useSession()
    const router = useRouter()

    if (session.status === "authenticated")
        return (
            <div className='h-full pt-14'>
                <section className='flex mt-10 flex-col items-center justify-center'>
                    <h1 className='font-heading mb-5 font-bold text-2xl'>Welcome {session.data?.user?.name}</h1>

                    <div className='rounded-md border border-light-grey shadow-md py-6 px-10 flex items-center '>
                        <div>
                            {session.data?.user?.image && <Image className='rounded-full mx-2' src={session.data?.user?.image} width={60} height={60} alt="profile" />}
                        </div>
                        <div>
                            <p className='font-body font-normal text-base'>Name: {session.data?.user?.name}</p>
                            <p className='font-body font-normal text-base'>Email: {session.data?.user?.email}</p>
                        
                        </div>

                    </div>
                </section>
            </div>
        )
    else if(session.status === "loading")
        return <Spinner />
    else router.push('/signin')
}

export default LandingPage