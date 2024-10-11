import React, { useState, useEffect } from 'react';
import Container from '../Container/Container';
import { useSelector } from 'react-redux';
import Input from '../Input';
import ChangeName from './ChangeName';

const ProfileComponent = () => {
    const userData = useSelector(state => state.auth.userData)

    
    
    return (
        <div className='h-screen'>
            <Container>
                <div className="flex flex-col items-center justify-center gap-2 py-5">
                    <div className="bg-slate-600 h-28 w-28 rounded-full flex justify-center items-center shadow">
                        <span className='text-4xl font-semibold'>{userData.name[0].toUpperCase()}</span>
                    </div>
                    <div className="">
                        <span className='text-3xl font-semibold'>{userData.name}</span>
                    </div>
                    <div className="">
                            <ChangeName {...userData} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default ProfileComponent;
