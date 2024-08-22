import React from 'react';
import { useSelector } from 'react-redux';

const Logo = ({width = '100px'}) => {
    const theme = useSelector(state => state.theme.theme)
    
    return (
        <div className='cursor-pointer'>
            {
            theme ?  (
                <img src="/assets/logo.png" alt="Codebeetle-Blog" width={width} className='dark:mix-blend-screen px-2 hover:animate-pulse'/>
            )  : (
                <img src="/assets/logo-light.png" alt="Codebeetle-Blog" width={width} className='dark:mix-blend-screen px-2 hover:animate-pulse'/>
            )
            } 
        </div>
    )
}

export default Logo;
