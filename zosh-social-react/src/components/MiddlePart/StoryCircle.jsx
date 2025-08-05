import React from "react";
import Avatar from "@mui/material/Avatar";

const StoryCircle = () => {
    return (
        <div className="flex flex-col items-center mr-3 md:mr-4 cursor-pointer">
            <Avatar 
                sx={{
                    width: { xs: "3.5rem", sm: "4rem", md: "5rem" },
                    height: { xs: "3.5rem", sm: "4rem", md: "5rem" }
                }}
                src="https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_640.jpg" 
            />
            <p className="text-xs md:text-sm mt-1 truncate max-w-[4rem]">codewith...</p>
        </div>
    )
}

export default StoryCircle;