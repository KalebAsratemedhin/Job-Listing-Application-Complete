"use client"

import Link from "next/link";

export default function Home() {

  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
     <div>
        <h1 className="font-heading font-medium text-4xl mb-6">Welcome to the JobListing Application</h1>
        <Link className="text-blue-800 underline flex justify-center font-heading" href="/joblist">job list</Link>
       
     </div>
    </div>
    </>
    
  );
}
