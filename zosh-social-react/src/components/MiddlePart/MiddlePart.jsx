import React from "react";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import { Card, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";

const story=[11,1,1,1,1]
const posts=[1,1,1,1,1]

const MiddlePart = () => {
  const handleOpenCreatePostModal = () => {
    console.log("open post model...");
  }

  return (
    <div className="px-2 md:px-10 lg:px-19">
      
      {/* Stories Section - Responsive */}
      <section className="flex items-center p-3 md:p-5 rounded-b-md overflow-x-auto">
        <div className="flex flex-col items-center mr-3 md:mr-4 cursor-pointer flex-shrink-0">
          <Avatar 
            sx={{
              width: { xs: "3.5rem", sm: "4rem", md: "5rem" },
              height: { xs: "3.5rem", sm: "4rem", md: "5rem" }
            }}
          >
            <AddIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />
          </Avatar>
          <p className="text-xs md:text-sm mt-1">New</p>
        </div>
        
        {story.map((item, index) => (
          <div key={index} className="flex-shrink-0">
            <StoryCircle />
          </div>
        ))}
      </section>
      
      {/* Create Post Card */}
      <Card className="p-3 md:p-5 mt-5">
        <div className="flex justify-between items-center">
          <Avatar sx={{ 
            width: { xs: "2.5rem", md: "3rem" },
            height: { xs: "2.5rem", md: "3rem" }
          }} />
          <input 
            readOnly 
            className="outline-none w-[85%] md:w-[90%] rounded-full bg-transparent border-[#3b4054] px-3 md:px-5 py-2 border text-sm md:text-base" 
            type="text" 
            placeholder="What's on your mind?"
          />
        </div>
        
        <div className="flex justify-center space-x-4 md:space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
            </IconButton>
            <span className="text-xs md:text-sm">media</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
            </IconButton>
            <span className="text-xs md:text-sm">video</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
            </IconButton>
            <span className="text-xs md:text-sm">write article</span>
          </div>
        </div>
      </Card>

      <div className="mt-5 space-y-5">
        {posts.map((item)=><PostCard/>)}
        
      </div>
    </div>
  );
};

export default MiddlePart;