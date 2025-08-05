import { Card, Grid } from '@mui/material';
import React from "react";
import Login from './Login';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';

const Authentication = () => {
  return (
    <div className="flex h-screen">
        {/* Phần ảnh - 40% */}
        <div className="w-3/5 overflow-hidden flex items-center justify-center">
            <img 
                className="max-h-full max-w-full object-contain" 
                src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png" 
                alt="" 
                style={{
                    objectFit: 'contain'
                }}
            />
        </div>
        
        {/* Phần form - 60% */}
        <div className="w-2/5 flex flex-col justify-center px-20">
            <Card className='card p-8'>
                <div className='flex flex-col items-center mb-5 space-y-1'>
                    <h1 className='logo text-center'>Zosh Social</h1>
                    <p className='text-center text-sm w-[70%]'>Connecting lives, sharing stories: your social world, your way</p>
                </div>

<Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Login />} />
</Routes>

            </Card>
        </div>
    </div>
  );
}

export default Authentication;