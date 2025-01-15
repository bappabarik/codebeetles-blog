import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazyload";

const PostCard = ({ $id, title, featuredImage, content, likes, reads }) => {
  const [isLiked, setIsLiked] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if ($id && userData) {
      appwriteService
        .getLikes($id, userData.$id)
        .then((data) => {
          if (data && data.documents.length > 0) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [$id, userData]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl shadow-lg flex flex-col hover:shadow-xl transition-shadow duration-300 h-[400px]">
        {/* Image Section */}
        <div className="w-full h-60 overflow-hidden rounded-t-xl relative group">
          <LazyLoad height={240} offset={100} once>
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="h-full w-full object-cover rounded-t-xl transform transition-transform duration-300 group-hover:scale-110"
            />
          </LazyLoad>
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded-full shadow-md h-8 w-8 flex items-center justify-center" >
            <i
              className={`${
                isLiked ? "fa-solid" : "fa-regular"
              } fa-heart text-lg`}
            ></i>
          </div>
        </div>
        {/* Content Section */}
        <div className="flex-grow p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mt-2 h-10 line-clamp-3 overflow-hidden">
            {parse(content)}
          </p>
        </div>
        {/* Footer Section */}
        <div className="p-4 bg-gray-100 rounded-b-xl flex justify-between items-center">
          <span className="text-sm text-gray-600 flex items-center justify-center">
            <i className="fa-solid fa-heart text-red-500 mr-2"></i>
            {likes} Likes
          </span>
          <span className="text-sm text-gray-600 flex items-center justify-center">
            <i className="fa-solid fa-eye text-blue-500 mr-2"></i>
            {reads} Views
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
