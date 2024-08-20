import React from 'react';

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = 'rounded-lg px-4 py-2',
    ...props
}) => {
    return (
        <button className={` ${className} ${bgColor} ${textColor}`}
        {...props}
        >
            {children}
        </button>
    );
}

export default Button;
