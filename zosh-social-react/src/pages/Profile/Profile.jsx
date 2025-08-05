import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import EditProfileModal from "../../pages/Profile/EditProfileModal";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savedPosts = [1, 1, 1];
const reposts = [1, 1];

const Profile = () => {
  const { id } = useParams();
  const { auth } = useSelector(store => store);
  const [value, setValue] = useState('post');
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditProfile = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // Check if this is current user's profile
  const isOwnProfile = auth.user && auth.user.id === parseInt(id);

  // Function để bỏ dấu tiếng Việt
  const removeVietnameseAccents = (str) => {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  };

  return (
    <div className="py-10 w-full">
      <div
        className="rounded-md mx-auto "
        style={{
          width: '800px',
          maxWidth: '100%',
          transform: 'translateX(8rem)'
        }}
      >
        {/* Cover Image */}
        <div className="h-[15rem] w-full relative">
          <img
            className="w-full h-full object-cover rounded-t-md"
            src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
            alt="Cover"
          />
        </div>

        {/* Profile Info Section */}
        <div className="px-5 relative">
          <div className="flex justify-between items-end -mt-16">
<Avatar
  className="border-4 border-white"
  sx={{
    width: "10rem",
    height: "10rem",
    marginBottom: "1rem"
  }}
  src={auth.user?.avatar ? `http://localhost:8080${auth.user.avatar}` : "https://lh3.googleusercontent.com/a/ACg8ocL1hVv0uY-1Hwzj5k2fUfdbgTKnARGRJRuuqNOt3065cY6bsg=s360-c-no"}
>
  {!auth.user?.avatar && (auth.user?.firstName?.[0] || 'U')}
</Avatar>

            {/* Edit/Follow Button */}
            <div className="mb-4">
              {isOwnProfile ? (
                <Button
                  sx={{ borderRadius: "20px" }}
                  variant="outlined"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  sx={{ borderRadius: "20px" }}
                  variant="outlined"
                >
                  Follow
                </Button>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4">
            <div>
              <h1 className="py-1 font-bold text-xl text-left">
                {auth.user?.firstName} {auth.user?.lastName}
              </h1>
              <p className="text-gray-600 text-left">
                @{removeVietnameseAccents(auth.user?.firstName)}_{removeVietnameseAccents(auth.user?.lastName)}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-5 items-center py-3">
              <span><strong>41</strong> posts</span>
              <span><strong>35</strong> followers</span>
              <span><strong>5</strong> followings</span>
            </div>

            {/* Bio */}
            <div>
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <section className="mt-5">
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="profile tabs"
              variant="fullWidth"
            >
              {tabs.map((item) => (
                <Tab
                  key={item.value}
                  value={item.value}
                  label={item.name}
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Content - giữ nguyên như cũ */}
          <div
            className="mt-5 px-5 overflow-hidden"
            style={{ width: '100%', minHeight: '300px' }}
          >
            {value === 'post' && (
              <div className="w-full border border-slate-200 rounded-md shadow-sm bg-white">
                <div className="space-y-5 p-5">
                  {posts.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ transform: 'scale(0.95)', transformOrigin: 'center' }}>
                        <PostCard />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Các tabs khác giữ nguyên... */}
            {value === 'reels' && (
              <div className="w-full border border-slate-200 shadow-sm bg-white rounded-md">
                <div className="p-5">
                  {reels.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 justify-items-start">
                      {reels.map((item, index) => (
                        <div key={index} className="flex-shrink-0">
                          <UserReelCard />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-gray-500">No reels yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        open={openEditModal} 
        onClose={handleCloseEditModal} 
      />
    </div>
  );
};

export default Profile;