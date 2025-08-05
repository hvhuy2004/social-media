import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import MiddlePart from "../../components/MiddlePart/MiddlePart";
import Reels from "../../components/Reels/Reels";
import CreateReelsForm from "../../components/Reels/CreateReelsForm";
import Profile from "../Profile/Profile";
import HomeRight from "../../components/HomeRight/HomeRight";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";


const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const {auth}= useSelector(store=> store);
  const isHomePage = location.pathname === "/";
  
  console.log("auth user", auth);

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        
        {/* Left Sidebar */}
        <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        {/* Main Content */}
        <Grid 
          item 
          xs={12}
          lg={isHomePage ? 5 : 9}
          className="px-5"
        >
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<Profile/>} />
          </Routes>
        </Grid>

        {/* Right Sidebar - Only on home */}
        {isHomePage && (
          <Grid item lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <div className="sticky top-0 w-full">
              <HomeRight/>
            </div>
          </Grid>
        )}

      </Grid>
    </div>
  );
};

export default HomePage;