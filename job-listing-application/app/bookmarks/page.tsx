"use client"

import { useSession } from "next-auth/react"
import { useGetAllJobsQuery, useGetBookmarksQuery } from "../api/apiSlice"
import { useRouter } from "next/navigation"
import Spinner from "../components/Spinner"
import Error from "../components/Error"
import JobCard from "../components/JobCard"
import BookmarkTile from "../components/Bookmark"


const Bookmarked = () => {
    const session = useSession()
    const router = useRouter()
    const accessToken = session.data?.user?.accessToken as string
    

    const {isLoading, isSuccess, isError, error, data} = useGetBookmarksQuery(accessToken, {
        refetchOnMountOrArgChange: true,
    })
    if(session.status === "unauthenticated")
        router.push('/signup')

    if(isLoading)
        return <Spinner />

    if (isError || !data){
        const errorMessage = error ? (error as any).data || "Something went wrong! Try again later!" : "Something went wrong! Try again later!";
        return <Error message={errorMessage} />;
    }

    if(data.data.length == 0)
        return <div className="flex justify-center items-center h-screen"> <h1 className="font-heading font-medium text-3xl">No bookmarks yet.</h1></div>
    
    return (
        <div className="pl-8 sm:pl-12 lg:pl-28 pr-10 sm:pr-20 lg:pr-72 py-16 ">
            <h1 className="font-heading text-3xl font-semibold">My Bookmarks</h1>
            {data?.data?.map((job) => <BookmarkTile key={job.eventID} bookmark={job} />)}

        </div>
    ) 
}

export default Bookmarked