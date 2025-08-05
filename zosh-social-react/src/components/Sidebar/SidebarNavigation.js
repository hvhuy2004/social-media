import { List, ListItemIcon } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Base navigation menu (không có Profile)
export const navigationMenu = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        path: "/"
    },
    {
        title: "Reels",
        icon: <ExploreIcon/>,
        path: "/reels"
    },
    {
        title: "Create Reels",
        icon: <ControlPointIcon/>,
        path: "/create-reels"
    },
    {
        title: "Notifications",
        icon: <NotificationsIcon/>,
        path: "/notifications"
    },
    {
        title: "Message",
        icon: <MessageIcon/>,
        path: "/message"
    },
    {
        title: "Lists",
        icon: <ListAltIcon/>,
        path: "/lists"
    },
    {
        title: "Communities",
        icon: <GroupIcon/>,
        path: "/communities"
    }
];

// Function để tạo navigation menu với user ID thực tế
export const getNavigationMenu = (userId) => [
    ...navigationMenu,
    {
        title: "Profile",
        icon: <AccountCircleIcon/>,
        path: `/profile/${userId}` // Dynamic user ID
    }
];