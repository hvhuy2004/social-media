import React from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const PopularUserCard = () => {
    return (
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 1.5,
            mb: 1,
            width: '100%',
            maxWidth:'none'
        }}>
            {/* Avatar và thông tin */}
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                <Avatar 
                    sx={{ 
                        bgcolor: red[500],
                        mr: 1,  
                        width: 44,  
                        height: 44
                    }} 
                    aria-label="recipe"
                >
                    R
                </Avatar>
                <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
                    <Typography variant="body1" sx={{  
                        fontWeight: 500, 
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'left'
                    }}>
                        Code With Zosh
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{  
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'left'
                    }}>
                        @codewithzosh
                    </Typography>
                </Box>
            </Box>
            
            {/* Nút Follow - Rộng hơn */}
            <Button 
                variant="outlined"
                size="small"
                sx={{ 
                    minWidth: 60,     
                    height: 24,      
                    fontSize: 11,     
                    padding: '2px 10px', 
                    ml: 2,
                    flexShrink: 0
                }}
            >
                Follow
            </Button>
        </Box>
    );
};

export default PopularUserCard;