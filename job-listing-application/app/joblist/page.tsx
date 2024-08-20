"use client"
import JobCard from "../components/JobCard"
import Spinner from "../components/Spinner"
import Error from "../components/Error"
import { useGetAllJobsQuery } from '@/app/api/apiSlice'
import { useSession } from "next-auth/react"

const page = () => {
    const session = useSession()
    const accessToken = session.data?.user?.accessToken as string
    const {data, isError, error, isLoading, isSuccess} = useGetAllJobsQuery(accessToken, {
        refetchOnMountOrArgChange: true,
    })
    const jobPosts = data?.data


    console.log("session from job list", session)

    

    if(isLoading)
        return <Spinner />

    if (isError || !jobPosts){
        const errorMessage = error ? (error as any).data || "Something went wrong! Try again later!" : "Something went wrong! Try again later!";
        return <Error message={errorMessage} />;
    }
       
    if (isSuccess && jobPosts){
        return ( 
            <div className="pl-8 sm:pl-12 lg:pl-28 pr-10 sm:pr-20 lg:pr-72 py-16 pt-24 ">
                <div className="flex justify-between">
                    <hgroup>
                        <h1 className="font-black text-3xl font-heading text-dark-blue">Opportunities</h1>
                        <h2 className="text-gray-500">Showing {jobPosts.length} results</h2>
                    </hgroup>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-400 font-body font-medium">Sort by: </p>

                        <select className="bg-white w-36 focus:border-collapse font-body font-medium " name="sortby" id="choice">
                            <option defaultValue="most-relevant" value="most-relevant">Most relevant</option>
                            <option value="latest">Latest</option>
                            <option value="popular">Popular</option>
                        </select>

                    </div>
                </div>

                <section>
                    {jobPosts.map((job) => <JobCard key={job.id} jobPost={job} />)}
                </section>
            </div>
        )}

}

export default page