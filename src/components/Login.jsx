import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import {useForm} from 'react-hook-form'
import { addProgress } from '../store/progressBarSlice';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, setValue, formState: {errors, isSubmitting}} = useForm()
    const [error, setError] = useState('')

    const login = async (data) => {
        setError('')
        dispatch(addProgress(10))
        try {
            const session = await authService.login(data)
            dispatch(addProgress(50))
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                dispatch(addProgress(75))
                navigate('/')
            }
            setValue("email", "")
            setValue("password", "")   
        } catch (error) {
            setError(error.message)
        }
        dispatch(addProgress(100))
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg light:bg-gray-100 dark:bg-slate-700 rounded-xl p-10 border border-black/10 shadow-lg`}>
            <div className="mb-2 flex justify-center">
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight dark:text-slate-100 light:text-black/60'>Sign in to your account</h2>
            <p className='mt-2 text-center text-base dark:text-white/60 text-black/60'>
                Dont&apos;t have any account?&nbsp;
                <Link 
                to="/signup"
                className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign Up
                </Link>
            </p>

            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)}
            className='mt-8'
            >
                <div className="space-y-5">
                    <Input
                    label="Email:"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: {value: true, message: "!Email Address is required"},
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                        }
                    })}
                    />
                    {
                        errors.email && (<span className='dark:text-red-200 text-red-600 mt-2'>{errors.email.message}</span>)
                    }
                    <Input
                    label="Password:"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: {value: true, message: "!Password is required"},             
                    })} 
                    />
                    {
                        errors.password && (<span className='dark:text-red-200 text-red-600 mt-2'>{errors.password.message}</span>)
                    }
                    <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 rounded-lg ${isSubmitting ? 'bg-opacity-60':null}`}
                    >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Login;
