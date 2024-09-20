import React, { useState, useEffect, useRef } from 'react';
import {Container, Logo, LogoutBtn, Theme} from '../index'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
    const [isProfileBtnClicked, setIsProfileBtnClicked] = useState(false)
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const profileMenuRef = useRef(null);
    
    // console.log(progress);
    const navigate = useNavigate()
    const navItems = [
        {
            name: (<><i className="fa-solid fa-home md:p-0 p-2"></i> <span className='md:inline hidden'>Home</span></>),
            slug: '/',
            active: true
        },
        {
            name: (<><i className="fa-regular fa-square-plus text-xl md:p-0 px-2 py-1"></i> <span className='md:inline hidden'>Add Post</span></>),
            slug: '/add-post',
            active: authStatus
        },
        {
            name: (<li className='flex items-center justify-center gap-2 hover:bg-transparent'><span className='md:inline hidden dark:text-white text-black'>Theme: </span><Theme /></li>),
            slug: '',
            active: true
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
    ]

    const profile = [
        {
            name: (<><i class="fa-solid fa-user"></i> Profile</>),
            slug: '/profile'
        },
        {
            name: (<><i class="fa-solid fa-list"></i> All Posts</>),
            slug: 'all-posts',
            active: authStatus
        },
        {
            name: (<><i class="fa-solid fa-pen"></i> My Posts</>),
            slug: '/my-posts'
        },
        {
            name: (<><i className="fa-solid fa-heart"></i> Liked Posts</>),
            slug: '/liked-posts'
        },
        {
            name: (<><i className="fa-solid fa-bookmark"></i> Saved Posts</>),
            slug: '/saved-posts'
        },
        {
            name: (<><i class="fa-solid fa-chart-simple"></i> Dashboard</>),
            slug: '/dashboard'
        },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            
            //check if the element that is clicked contains the profileMenuRef element or not if not then set the isProfileBtnClicked to false
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileBtnClicked(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenuRef]);
   
    return (
        <header className='py-3 px-3 z-20 fixed w-full shadow bg-white dark:bg-slate-800'>
            <Container>
                    {/* <div className={isOpen ? "w-full h-screen absolute z-10 top-0 left-0 bottom-0  bg-slate-900 bg-opacity-60" : ""}>
                    </div> */}
                <nav className='nav-menu flex justify-between gap-2'>
                    <div className="mr-4 flex items-center">
                        <Link to='/'>
                        <Logo width='200px' />
                        </Link>
                    </div>
                    <ul className='flex md:ml-auto items-center justify-center md:gap-2'>
                        {navItems.map((item) => 
                        item.active ? (
                            <li key={item.slug} className=' md:flex md:items-center'>
                                <button 
                                onClick={() => {
                                    item.slug ? navigate(item.slug) : null
                                }}
                                className={`inline-bock md:m-2 transition-all duration-300 ease-in-out dark:text-white text-slate-700 rounded-md hover:text-white  font-mono text-lg md:px-4 md:py-2 px-2 py-1 ${item.slug === '' ? 'cursor-default': 'hover:bg-green-600 '}`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}
                    
                    </ul>
                    {
                        authStatus && (
                        <div className='flex items-center' ref={profileMenuRef}>
                        <button onClick={() => setIsProfileBtnClicked(!isProfileBtnClicked)} className='profile-pic'>
                            <div className=' w-10 h-10 text-center flex items-center justify-center rounded-full text-white bg-green-600 font-semibold text-xl'>{userData.name[0].toUpperCase()}</div>
                        </button>
                        <ul 
                        className={`flex flex-col items-center dark:bg-slate-800 bg-gray-100 dark:text-white gap-5 absolute md:top-20 top-16 px-4 pt-4 w-48 h-screen right-0 transform transition-transform duration-300 ease-in-out ${isProfileBtnClicked ? 'translate-x-0' : 'translate-x-full'}`}>
                        {
                            profile.map(item => (
                                <li key={item.slug} className='w-full p-3 '>
                                    <NavLink
                                    to={item.slug}
                                    onClick={() => setIsProfileBtnClicked(false)}
                                    className={({isActive}) => ` ${isActive ? 'bg-green-700 text-white' : '' } p-3 hover:bg-green-700 rounded-md  dark:text-white hover:text-white cursor-pointer transition-all delay-100`
                                    } 
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                        <li className='md:flex md:items-center '>
                                <LogoutBtn />
                        </li>
                        </ul>
                        </div>
                        )
                    }
                    {/* <button className='md:hidden fixed right-3 top-2 dark:text-slate-300 text-slate-900 text-3xl z-50' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "X" : "≡"}
                    </button> */}
                </nav>

            </Container>
        </header>
    );
}

export default Header;
