import React, { useState } from 'react';
import {Container, Logo, LogoutBtn, Theme} from '../index'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const authStatus = useSelector((state) => state.auth.status)
    
    // console.log(progress);
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'Login',
            icon: '➡',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: 'all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        }
    ]
    return (
        <header className='py-3 px-3 z-10 fixed w-full shadow bg-white dark:bg-slate-800'>
            <Container>
                    <div className={isOpen ? "w-full h-screen absolute z-10 top-0 left-0 bottom-0  bg-slate-900 bg-opacity-60" : ""}>
                    </div>
                <nav className=' flex justify-between'>
                    <div className="mr-4 flex items-center">
                        <Link to='/'>
                        <Logo width='200px' />
                        </Link>
                    </div>
                    <ul className={isOpen ? 'flex-col gap-8 absolute z-20 md:hidden right-10 top-20 dark:bg-slate-800 bg-slate-100 bg-opacity-100 p-12 h-80 shadow' : ' ml-auto gap-3 md:flex hidden'}>
                        {navItems.map((item) => 
                        item.active ? (
                            <li key={item.name} className=' md:flex md:items-center'>
                                <button 
                                onClick={() => {
                                    navigate(item.slug)
                                    setIsOpen(false)
                                }}
                                className={item.name === "Login" ? " px-6 py-2 duration-200 hover:bg-opacity-30 border border-green-500 bg-green-500 bg-opacity-20 text-green-400 font-mono text-lg m-2" :'inline-bock m-2 px-6 py-2 duration-200 hover:bg-green-500 hover:bg-opacity-20 dark:text-slate-300 text-slate-700 hover:text-green-500 hover:border border-green-500 font-mono text-lg'}
                                >
                                    {item.name}
                                    {" "}
                                    {item.icon && item.icon }
                                </button>
                            </li>
                        ) : null
                    )}
                    {
                        authStatus && (
                            <li className='md:flex md:items-center '>
                                <LogoutBtn />
                            </li>
                        )
                    }
                    <li className=' self-center absolute top-0 right-0 md:static'>
                        <Theme />
                    </li>
                    </ul>
                    <button className='md:hidden fixed right-3 top-2 dark:text-slate-300 text-slate-900 text-3xl z-50' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "X" : "≡"}
                    </button>
                </nav>

            </Container>
        </header>
    );
}

export default Header;
