import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Box, Avatar, Typography, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - sau này thay bằng API call
  const mockUsers = [
    { id: 1, name: "John Doe", username: "@johndoe", avatar: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png" },
    { id: 2, name: "Jane Smith", username: "@janesmith", avatar: "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_640.jpg" },
    { id: 3, name: "Code With Zosh", username: "@codewithzosh", avatar: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png" }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleUserSelect = (user) => {
    console.log("Selected user:", user);
    // Navigate to user profile
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      {/* Search Input */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClearSearch}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            backgroundColor: '#f5f5f5',
            '&:hover': {
              backgroundColor: '#eeeeee',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
            }
          }
        }}
      />

      {/* Search Results Dropdown */}
      {(searchResults.length > 0 || isSearching) && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            maxHeight: 300,
            overflow: 'auto',
            borderRadius: 2
          }}
        >
          {isSearching ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Searching...
              </Typography>
            </Box>
          ) : searchResults.length > 0 ? (
            searchResults.map((user) => (
              <Box
                key={user.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  },
                  borderBottom: '1px solid #eee'
                }}
                onClick={() => handleUserSelect(user)}
              >
                <Avatar
                  src={user.avatar}
                  sx={{ width: 32, height: 32, mr: 1.5 }}
                >
                  {user.name[0]}
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.username}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No users found
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SearchUser;