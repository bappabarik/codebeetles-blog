import React from 'react';
import PostComp from '../components/PostComp';
import { useSelector } from 'react-redux';
import { Button, Container, Logo } from '../components';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const status = useSelector(state => state.auth.status)
    const navigate = useNavigate()

     if (!status) {
        return (
            <div className="w-full text-center ">
            <Container>
            <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full dark:bg-slate-800 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold dark:text-slate-100 text-center mb-1">Welcome to</h1>
                <Logo width='300px' />
                <p className="text-gray-500 text-center my-6">
                Join us today to enjoy all the benefits of our platform. Please log in or sign up to get started!
                </p>
                <div className="flex justify-center space-x-4">
                <Button
                onClick={() => navigate('/login')} className='px-6 py-2 duration-200 hover:bg-opacity-90 rounded-md bg-blue-500 text-white text-lg m-2'>
                    Log In
                </Button>
                <Button onClick={() => navigate('/signup')} className="px-6 py-2 duration-200 hover:bg-opacity-90 bg-green-600 rounded-md text-lg m-2">
                    Sign Up
                </Button>
                </div>
            </div>
            </div>
        </Container>
        </div>
    )
    }
    return (
        <div>
            <PostComp />
        </div>
    );
}

export default Post;
