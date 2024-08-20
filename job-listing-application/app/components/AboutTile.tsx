
import Image from "next/image";
import React, { ReactNode } from "react";
interface Props{
    title: string;
    value: string;
    icon: string;

}

const AboutTile = ({title, value, icon}: Props) => {
  return (
    <div className="flex mb-2 items-center">
        <div className=" w-10 h-10 flex justify-center items-center border  rounded-3xl bg-white">
          <Image src={icon} alt="icon"  />
        </div>
        <div className="flex flex-col ml-4">
          <p className="font-normal font-body  text-dark-blue">{title}</p>
          <p className="font-semibold font-body text-dark-blue">{value}</p>
        </div>

    </div>
  )
}

export default AboutTile