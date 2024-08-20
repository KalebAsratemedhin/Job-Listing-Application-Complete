
const Tag = ({ text, bg, border, name, type }: { text: string; bg: string; border?: string; name: string; type?: "filled" | "bordered" }) => {
  
  if(type == "bordered")
    return (
      <div className={`rounded-full font-body px-4 py-1 ${text}  border ${border} `}>
        {name}
      </div>
    );
    
  if(type == "filled")
    return (
      <div className={`rounded-full font-body px-4 py-1 ${text} ${bg} bg-opacity-10 `}>
        {name}
      </div>
    );
};

export default Tag;
