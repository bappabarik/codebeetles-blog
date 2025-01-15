import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../components';

const MyPosts = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/my-posts") {
            navigate("/my-posts/active-posts");
        }
    }, [location, navigate]);

    return (
        <Container>
            {/* Header Section */}
            <div className="sticky md:top-[5.5rem] top-[4.2rem] z-10 w-full bg-green-600 shadow-lg text-white flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 md:px-12 md:py-6">
                <h1 className="text-xl md:text-3xl font-semibold">My Posts</h1>
                <div className="flex gap-4">
                    <NavLink
                        to="/my-posts/active-posts"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-md font-medium transition-all duration-300 ${isActive ? 'bg-white text-indigo-500' : 'bg-indigo-700 hover:bg-indigo-600'}`
                        }
                    >
                        Active Posts
                    </NavLink>
                    <NavLink
                        to="/my-posts/inactive-posts"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-md font-medium transition-all duration-300 ${isActive ? 'bg-white text-indigo-500' : 'bg-indigo-700 hover:bg-indigo-600'}`
                        }
                    >
                        Inactive Posts
                    </NavLink>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full mx-auto">
                    <Outlet />
            </div>
        </Container>
    );
};

export default MyPosts;
