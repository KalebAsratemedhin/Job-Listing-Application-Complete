import React, { useEffect, useState } from 'react'
import Bookmark from '../types/Bookmark'
import Tag from './Tag'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCreateBookmarkMutation, useDeleteBookmarkMutation, useGetAllJobsQuery } from '../api/apiSlice'
import { IoBookmarks, IoBookmarksOutline } from 'react-icons/io5'
import { MdOpenInNew } from 'react-icons/md'

const BookmarkTile = ({bookmark}: {bookmark: Bookmark}) => {
  const titleTokens = bookmark.title.split(" ")
    
    const title = titleTokens.map(token => {

        return token[0].toUpperCase() + token.substring(1)
    
    }).join(" ")
    const [createBookmark, {isLoading: isBookmarkLoading, isError: isBookmarkError, isSuccess: isBookmarkSuccess, error: bookmarkError}] = useCreateBookmarkMutation()
    const [deleteBookmark, {isLoading: isUnBookmarkLoading, isError: isUnBookmarkError, isSuccess: isUnBookmarkSuccess, error: unBookmarkError}] = useDeleteBookmarkMutation()
    
    
    const [isBookmarked, setIsBookmarked] = useState(true)

    const router = useRouter()
    const { data: session } = useSession();
    const accessToken = session?.user?.accessToken as string


    const handleClick = () => {
        router.push(`/dashboard/${bookmark.eventID}`);
        
    }   

    const handleBookmarkToggle = async () => {
        if (isBookmarked) {
            await deleteBookmark({ eventId: bookmark.eventID, token: accessToken });
        } else {
            await createBookmark({ eventId: bookmark.eventID, token: accessToken });
        }
    };

    

    useEffect(() => {
        if(isBookmarkSuccess){
            setIsBookmarked(true)
        }

        if(isUnBookmarkSuccess){
            setIsBookmarked(false)
        }

    }, [isBookmarkSuccess, isUnBookmarkSuccess])
  return (
    <div className="p-6 mt-7 border rounded-3xl bg-white grid grid-cols-10 gap-2 " >
        <div className="rounded-full col-span-1">
            <img src={bookmark.logoUrl} alt="logo" width={60} height={60} />

        </div>
        <div className="col-span-9">
           
            <div className="flex justify-between">
                <div className="mb-2">
                    <h1 data-testid="job-title" className="font-body text-dark-blue">{ title}</h1>
                    <h2 data-testid="org-name-and-location" className="text-grey-subtitle font-body">{bookmark.orgName} <span className="text-gray-500 text-2xl relative bottom-1 ">.</span> {bookmark.location}</h2>
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
                    Posted: {new Date(bookmark.datePosted).toDateString()}
                </p>
                <p className="font-body text-dark-blue"> 
                   Bookmarked: {new Date(bookmark.dateBookmarked).toDateString()}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <div ><Tag type="filled" text="text-green-tag" bg="bg-green-tag" name={bookmark.opType == "inPerson" ? "In Person" : "Remote"} /></div>
                
            
            </div>
        </div>
        
        
    </div>
  )
}

export default BookmarkTile