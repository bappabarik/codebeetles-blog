import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../components';

const MyPosts = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/my-posts") {
            navigate("/my-posts/active-posts");
        }
    }, [location, navigate]);

    return (
        <Container>
        {/* Adjusted the layout for better responsiveness */}
        <div className="fixed left-0 top-[4.7rem] z-10 w-full h-auto bg-slate-900 shadow text-left flex flex-wrap gap-2 items-center justify-between px-8 py-6 md:px-20 md:py-8">
            <h1 className="dark:text-white text-lg md:text-2xl">My Posts</h1>
            <div className="flex items-center justify-center">
            <NavLink 
                to="/my-posts/active-posts"
                className={({isActive}) => `md:px-4 md:py-2 px-3 py-2 mr-1 md:text-lg text-sm rounded-md ${isActive ? 'bg-green-700' : 'bg-gray-500'} text-white`}>
                Active Posts
            </NavLink>

            <NavLink 
                to="/my-posts/inactive-posts" 
                className={({isActive}) => `md:px-4 md:py-2 px-3 py-2 mr-1 md:text-lg text-sm rounded-md ${isActive ? 'bg-green-700' : 'bg-gray-500'} text-white`}>
                Inactive Posts
            </NavLink>
            </div>
        </div>

        {/* Adding enough padding to ensure content does not overlap */}
        <div className="w-full text-center py-16 md:py-24 max-h-full"> 
            <div className="flex flex-wrap">
            <div className="px-2 w-full">
                <Outlet />
            </div>
            </div>
        </div>
        </Container>

      
    )

}

export default MyPosts;
