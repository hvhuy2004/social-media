import React, { useState } from "react";
import { getNavigationMenu } from "./SidebarNavigation"; // Import function thay vì array
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../Redux/Auth/auth.action";

const Sidebar = () => {
  const {auth} = useSelector(store => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  
  // Tạo dynamic navigation menu với user ID thực tế
  const navigationMenuWithProfile = auth.user ? getNavigationMenu(auth.user.id) : [];
  
  const removeVietnameseAccents = (str) => {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (item) => {
    console.log("Navigating to:", item.path); // Debug để check path
    navigate(item.path);
  };

  const handleLogout = () => {
    dispatch(logoutUserAction());
    handleClose();
  };

  return (
    <div className="card h-screen w-72 flex flex-col justify-between py-5 shadow-lg"> 
      
      <div className="space-y-8 pl-5">
        <div className="text-left">
          <span className="logo font-bold text-xl">Zosh Social</span>
        </div>

        <div className="space-y-8">
          {navigationMenuWithProfile && Array.isArray(navigationMenuWithProfile) ? 
            navigationMenuWithProfile.map((item) => (
              <div className="flex space-x-3 items-center cursor-pointer" key={item.title} onClick={() => handleMenuClick(item)}>
                {item.icon}
                <p className="text-xl">{item.title}</p>
              </div>
            )) : 
            <p>Loading navigation...</p>
          }
        </div>
      </div>
      
      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
<Avatar src={auth.user?.avatar ? `http://localhost:8080${auth.user.avatar}` : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}>
  {!auth.user?.avatar && (auth.user?.firstName?.[0] || 'U')}
</Avatar>
            <div>
              <p className="font-bold">{auth.user?.firstName + " " + auth.user?.lastName}</p>
              <p className="opacity-70">@{removeVietnameseAccents(auth.user?.firstName) + "_" + removeVietnameseAccents(auth.user?.lastName)}</p>
            </div>
          </div>
          
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem onClick={() => navigate(`/profile/${auth.user?.id}`)}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;