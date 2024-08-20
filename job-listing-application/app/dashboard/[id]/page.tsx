"use client"
import AboutTile from "../../components/AboutTile";
import Tag from "../../components/Tag";
import Image from "next/image";
import calendarCheckIcon from "../../../public/calendar-check.svg";
import calendarStartIcon from '../../../public/calendar-start.svg'
import locationIcon from "../../../public/Icon-location.svg"
import fireIcon from "../../../public/fireIcon.svg"
import plusIcon from '../../../public/plus-circle.svg'
import { useGetJobByIdQuery } from '@/app/api/apiSlice'
import Spinner from "@/app/components/Spinner";
import Error from "@/app/components/Error"

const page = ({params}: {params: {id: string}}) => {
    const {data, isLoading, isError, isSuccess, error } = useGetJobByIdQuery(params.id)
    const post = data?.data
    const colors = [['text-orange-tag', 'bg-orange-tag', 'border-orange-tag'], ['text-purple-tag', 'bg-purple-tag', 'bg-purple-tag']];
    
   
    if(isLoading)
        return <Spinner />

    if(isError || !post){
        const errorMessage = error ? (error as any).data || "Something went wrong! Try again later!" : "Something went wrong! Try again later!";
        return <Error message={errorMessage} />;
    }
      
    if(isSuccess && post)
        return (
            <div className="md:grid grid-cols-4 p-8">
                <section className="col-span-3 pr-12 py-12">
                    <div className="mb-8">
                        <h1 className="pl-8  mb-2 font-black font-heading text-xl text-dark-blue">Description</h1>
                        <div className="pl-8 text-dark-blue font-body text-base ">{post.description}</div>
                    </div>
                    <div className="mb-8">
                        <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">Responsibilities</h1>
                        <p className="pl-8 text-dark-blue font-body text-base">
                            {post.responsibilities}
                        </p>
                        
                    </div>
                    <div className="mb-8">
                        <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">Ideal Candidate we want</h1>
                        
                            <div>
                                <p className="pl-8 text-dark-blue font-body text-base">
                                    {post.idealCandidate}
                                </p>
                            </div>
                        <div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">When & where</h1>
                        <div className="pl-6 font-body font-normal text-base flex items-center gap-4 mt-2"> 
                            <div className=" w-10 h-10 flex justify-center items-center border  rounded-3xl bg-white">
                                <Image src={locationIcon} alt="icon"  />
                            </div>
                             {post.whenAndWhere}
                        </div>
                    </div>
                    
                </section>
        
                <aside className="col-span-1">
                    <div className="border-b-2 flex flex-col gap-3 mb-3">
                        <h2 className="font-bold mb-2 font-heading text-xl text-dark-blue">About</h2>                
                        
                        <AboutTile title="Posted On" value={new Date(post.datePosted).toDateString()} icon={plusIcon}  />
                        <AboutTile title="Deadline" value={new Date(post.deadline).toDateString()} icon={fireIcon} />
                        <AboutTile title="Location" value={post.location.join(", ")} icon={locationIcon} />
                        <AboutTile title="Start Date" value={new Date(post.startDate).toDateString()} icon={calendarStartIcon}/>
                        <AboutTile title="End Date" value={new Date(post.endDate).toDateString()} icon={calendarCheckIcon} />
                    </div>
                    <div className="border-b-2 mt-3 mb-3 pb-4">
                        <h2 className="font-bold font-heading text-xl text-dark-blue">Categories</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {post.categories.map((category, index) => {
                            const color = colors[index % colors.length];
        
                            return <Tag type="filled" key={index} text={color[0]} bg={color[1]} name={category} />
                            
                            
                            })}
                        </div>
                    </div>
                    <div className="mt-3">
                        <h2 className="font-bold font-heading text-xl text-dark-blue ">Required Skills</h2>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {post.requiredSkills.map((skill, index) => {
                                return <Tag type="filled" key={index} text={"text-purple-tag"} bg={"bg-purple-tag"} name={skill} />
                            })}
                        </div>
                    </div>
                </aside>
            </div>
          )

}

export default page