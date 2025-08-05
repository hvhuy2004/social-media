import React from "react";

const UserReelCard = () => {
    return (
        <div 
            className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm"
            style={{
                width: '240px',     // Cố định width
                height: '400px',    // Cố định height
                aspectRatio: '9/16' // Tỉ lệ video chuẩn
            }}
        >
            <video
                controls
                className=" w-full h-full object-cover"  // object-cover để fill và crop
                src="https://cdn.pixabay.com/video/2025/06/03/283431_large.mp4"

            />
        
        </div>
    );
};

export default UserReelCard;