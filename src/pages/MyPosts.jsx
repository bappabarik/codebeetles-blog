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
        <div className="w-full py-8 mt-4 text-center max-h-full ">
            <Container>
                
                <div className="border-b-[1px] border-b-gray-700 pb-2 text-left flex items-center justify-between">
                    <h1 className='dark:text-white'>My Posts</h1>
                    <div className="">
                    <NavLink 
                        to="/my-posts/active-posts"
                        className={({isActive}) => `px-4 py-2 mr-2 rounded-md ${isActive ? 'bg-green-700': 'bg-gray-500'}  text-white`}>
                        Active Posts
                    </NavLink>

                    <NavLink 
                        to="/my-posts/inactive-posts" 
                        className={({isActive}) => `px-4 py-2 mr-2 rounded-md ${isActive ? 'bg-green-700': 'bg-gray-500'}  text-white`}>
                        Inactive Posts
                    </NavLink>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <Outlet />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MyPosts;
