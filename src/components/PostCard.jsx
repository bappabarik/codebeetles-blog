import React from 'react';
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import parse from "html-react-parser"

const PostCard = ({$id, title, featuredImage, content}) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-2xl drop-shadow-md ">
                <div className="w-full justify-center overflow-hidden rounded-xl rounded-b-none shadow-md">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className='rounded-xl rounded-b-none bg-contain h-72 w-full object-cover hover:scale-125 hover:transform transition-transform duration-300 ease-in-out'
                    />

                </div>
                <div className=" p-3 space-y-1 shadow-inner">
                <h2 className='text-xl text-left font-bold truncate'>{title}</h2>
                <span className=' p-1 opacity-60 text-left line-clamp-1 ...'>{parse(content)}</span>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-14 z-50">
                <div className="w-0 h-0 border-t-[32px] border-t-gray-200 border-l-[32px] border-l-transparent transform translate-x-8 -translate-y-8 shadow-lg"></div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
