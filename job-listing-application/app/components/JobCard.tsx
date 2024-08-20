
"use client";
// import JobPost from "../types/JobPost";
import { useRouter } from "next/navigation"
import Tag from "./Tag";
import { IoBookmarks } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import { MdOpenInNew } from "react-icons/md";

// import { useFormState } from "react-dom";
// import { useCreateBookmarkMutation, useDeleteBookmarkMutation, useGetBookmarksQuery } from "../api/apiSlice";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { AuthUser } from "../types/AuthUser";
// import { RiH1 } from "react-icons/ri";

// const JobCard = ({jobPost}: {jobPost: JobPost}) => {
//     const titleTokens = jobPost.title.split(" ")
    
//     const title = titleTokens.map(token => {

//         return token[0].toUpperCase() + token.substring(1)
    
//     }).join(" ")
//     const { data: session } = useSession();
//     const accessToken = session?.user?.accessToken as string
//     const [createBookmark, {isLoading: isBookmarkLoading, isError: isBookmarkError, isSuccess: isBookmarkSuccess, error: bookmarkError}] = useCreateBookmarkMutation()
//     const [deleteBookmark, {isLoading: isUnBookmarkLoading, isError: isUnBookmarkError, isSuccess: isUnBookmarkSuccess, error: unBookmarkError}] = useDeleteBookmarkMutation()
//     const [isBookmarked, setIsBookmarked] = useState(jobPost.isBookmarked)
//     const {refetch} = useGetBookmarksQuery(accessToken)
//     const router = useRouter()
//     const handleClick = () => {
//         router.push(`/dashboard/${jobPost.id}`);
        
//     }   

//     const handleBookmark = async () => {
//         if(session?.user?.accessToken)
//             await createBookmark({eventId: jobPost.id, token: session?.user?.accessToken})
//     }

//     const handleUnBookmark = async () => {
//         if(session?.user?.accessToken)
//             await deleteBookmark({eventId: jobPost.id, token: session?.user?.accessToken})
//     }


//     useEffect(() => {
//         if(isBookmarkSuccess){
//             setIsBookmarked(true)
//             refetch() 

//         }

//         if(isUnBookmarkSuccess){
//             setIsBookmarked(false)
//             refetch()

//         }

//     }, [isBookmarkSuccess, isUnBookmarkSuccess, refetch])



//     const colors = [['text-orange-tag', 'bg-orange-tag', 'border-orange-tag'], ['text-purple-tag', 'bg-purple-tag', 'border-purple-tag']];
  

//   return (
//     <div className="p-6 mt-7 border rounded-3xl bg-white grid grid-cols-10 gap-2 " >
//         <div className="rounded-full col-span-1">
//             <img src={jobPost.logoUrl} alt="logo" width={60} height={60} />

//         </div>
//         <div className="col-span-9">
           
//             <div className="flex justify-between">
//                 <div className="mb-2">
//                     <h1 data-testid="job-title" className="font-body text-dark-blue">{ title}</h1>
//                     <h2 data-testid="org-name-and-location" className="text-grey-subtitle font-body">{jobPost.orgName} <span className="text-gray-500 text-2xl relative bottom-1 ">.</span> {jobPost.location.join(", ")}</h2>
//                 </div>
//                 <div className="flex">
//                     <p>{isBookmarked && "bookmarked"} {isBookmarkSuccess && "success"}</p>
//                 { session?.user && 
//                     (isBookmarked ?  
//                         <IoBookmarks data-testid="unbookmark-icon" onClick={handleUnBookmark} className="text-gray-500 hover:text-black w-10 h-6"/> 
//                         :
//                         <IoBookmarksOutline data-testid="bookmark-icon" onClick={handleBookmark} className="text-gray-500 hover:text-black w-10 h-6" />

//                     )
//                 }
//                     <MdOpenInNew onClick={handleClick} className="text-gray-500 hover:text-black w-10 h-6"/> 
//                 </div>
//             </div>
//             <div>
//                 <p className="font-body text-dark-blue"> 
//                     {jobPost.description}
//                 </p>
//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">
//                 <div className="border-r-2 pr-3"><Tag type="filled" text="text-green-tag" bg="bg-green-tag" name={jobPost.opType == "inPerson" ? "In Person" : "Remote"} /></div>
                
//                {jobPost.categories.map((category, index) => {
//                 const color = colors[index % colors.length];

//                 return <Tag type="bordered" key={index} text={color[0]} bg={color[1]}  border={color[2]} name={category} />
                
    
//                 })}
//             </div>
//         </div>
        
        
//     </div>
//   )
// }

// export default JobCard


import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addBookmark, removeBookmark } from '../api/bookmarkSlice';
import { useCreateBookmarkMutation, useDeleteBookmarkMutation } from "../api/apiSlice";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import JobPost from '../types/JobPost';

const JobCard = ({ jobPost }: { jobPost: JobPost }) => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const accessToken = session?.user?.accessToken as string;
    const colors = [['text-orange-tag', 'bg-orange-tag', 'border-orange-tag'], ['text-purple-tag', 'bg-purple-tag', 'border-purple-tag']];
    const router = useRouter()
    const handleClick = () => {
        router.push(`/dashboard/${jobPost.id}`);
        
    }   

    const titleTokens = jobPost.title.split(" ")
    
    const title = titleTokens.map(token => {

        return token[0].toUpperCase() + token.substring(1)
    
    }).join(" ")

    const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);
    const isBookmarked = bookmarks.some(bookmark => bookmark.id === jobPost.id);

    const [createBookmark, { isSuccess: isBookmarkSuccess }] = useCreateBookmarkMutation();
    const [deleteBookmark, { isSuccess: isUnBookmarkSuccess }] = useDeleteBookmarkMutation();

    const handleBookmarkToggle = async () => {
        if (isBookmarked) {
            await deleteBookmark({ eventId: jobPost.id, token: accessToken });
        } else {
            await createBookmark({ eventId: jobPost.id, token: accessToken });
        }
    };

    useEffect(() => {
        if (isBookmarkSuccess) {
            dispatch(addBookmark(jobPost));

        } else if (isUnBookmarkSuccess){
            dispatch(removeBookmark(jobPost.id));
            
        }

    }, [isBookmarkSuccess, isUnBookmarkSuccess]);

    return (
        <div className="p-6 mt-7 border rounded-3xl bg-white grid grid-cols-10 gap-2 " >
            <div className="rounded-full col-span-1">
                <img src={jobPost.logoUrl} alt="logo" width={60} height={60} />

            </div>
            <div className="col-span-9">
                
                <div className="flex justify-between">
                    <div className="mb-2">
                        <h1 data-testid="job-title" className="font-body text-dark-blue">{ title}</h1>
                        <h2 data-testid="org-name-and-location" className="text-grey-subtitle font-body">{jobPost.orgName} <span className="text-gray-500 text-2xl relative bottom-1 ">.</span> {jobPost.location.join(", ")}</h2>
                    </div>
                    <div className="flex">
                    { session?.user && 
                        (isBookmarked ?  
                            <IoBookmarks data-testid="unbookmark-icon" onClick={handleBookmarkToggle} className="text-gray-500 hover:text-black w-10 h-6"/> 
                            :
                            <IoBookmarksOutline data-testid="bookmark-icon" onClick={handleBookmarkToggle} className="text-gray-500 hover:text-black w-10 h-6" />

                        )
                    }
                        <MdOpenInNew onClick={handleClick} className="text-gray-500 hover:text-black w-10 h-6"/> 
                    </div>
                </div>
                <div>
                    <p className="font-body text-dark-blue"> 
                        {jobPost.description}
                    </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <div className="border-r-2 pr-3"><Tag type="filled" text="text-green-tag" bg="bg-green-tag" name={jobPost.opType == "inPerson" ? "In Person" : "Remote"} /></div>
                    
                    {jobPost.categories.map((category, index) => {
                    const color = colors[index % colors.length];

                    return <Tag type="bordered" key={index} text={color[0]} bg={color[1]}  border={color[2]} name={category} />
                    
        
                    })}
                </div>
            </div>
            
            
        </div>)
};

export default JobCard;
