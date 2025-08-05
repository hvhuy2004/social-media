import React from "react";
import { Card, Icon } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';

const PostCard = () => {
    return (
        <Card sx={{ maxWidth: 620, width: '100%', margin: '0 auto' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Code With Zosh"
                subheader="@codewithzosh"
                sx={{
                    textAlign: 'left',
                    '& .MuiCardHeader-content': {
                        textAlign: 'left'
                    }
                }}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_640.jpg"
                alt="Paella dish"
            />
            <CardContent sx={{ padding: 0 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', padding: '8px 16px', textAlign: 'left' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions className="flex justify-between" disableSpacing>
                <div>
                    <IconButton>
                        {true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <IconButton>
                        {<ChatBubbleIcon />} 
                    </IconButton>

                    <IconButton>
                        {<ShareIcon />} 
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                    
                </div>
            </CardActions>
        </Card>
    )
}

export default PostCard;