import React, {useState} from 'react';
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data)
            console.log("createAccount", userData);
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))

                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg light:bg-gray-100 dark:bg-slate-700 rounded-xl p-10 border border-black/10 shadow-lg`}>
            <div className="mb-2 flex justify-center">
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight dark:text-slate-100 light:text-black/60'>Sign up to create account</h2>
            <p className='mt-2 text-center text-base dark:text-white/60 text-black/60'>
                Already have an account?&nbsp;
                <Link 
                to="/login"
                className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign In
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(create)}>
                <div className="space-y-5">
                    <Input
                    label="Full Name:"
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email:"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password:"
                    placeholder="Create a password"
                    type="password"
                    {...register("password", {
                        required: true,             
                    })} 
                    />
                    <Button
                    type="submit"
                    className="w-full px-4 py-2 rounded-lg"
                    >Sign up</Button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Signup;