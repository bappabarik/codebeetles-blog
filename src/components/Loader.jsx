import React from 'react';

const Loader = ({
    children,
    className = 'text-4xl animate-spin text-green-400'
}) => {
    return (
        <div>
            <h1 className={`${className} `}><i className="fa-solid fa-spinner"></i></h1>
        </div>
    );
}

export default Loader;
