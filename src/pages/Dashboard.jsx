import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const posts = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData)
    const [totalLikes, setTotalLikes] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalViews, setTotalViews] = useState(0)
    const [totalSaves, setTotalSaves] = useState(0)
    const [popularPosts, setPopularPosts] = useState([])


    const weights = { likes: 2, reads: 1, saves: 3 };


    function calculatePopularityScore(post, weights) {
        return (weights.likes * post.likes) + (weights.reads * post.reads) + (weights.saves * post.saveIds.length);
    }

    function getPopularPosts(posts, weights, limit = 4) {
        return posts
          .map(post => ({
            ...post,
            popularityScore: calculatePopularityScore(post, weights)
          }))
          .sort((a, b) => b.popularityScore - a.popularityScore)
          .slice(0, limit)
      }
    
    useEffect(() => {
        const userPosts = posts.filter(post => post.userId === userData.$id)
        setTotalPosts(userPosts.length)
        setTotalLikes(userPosts.reduce((accumulator, currentValue) => accumulator + currentValue.likes,
        0))
        setTotalViews(userPosts.reduce((accumulator, currentValue) => accumulator + currentValue.reads,
        0))
        setTotalSaves(userPosts.reduce((accumulator, currentValue) => accumulator + currentValue.saveIds.length,
        0))
        
        setPopularPosts(getPopularPosts(userPosts, weights))
        
    }, [posts]);
    
    
    
    return (
        <div className='flex flex-col min-h-screen items-start dark:text-white'>
            <div className="flex md:flex-row flex-col gap-2 items-center justify-between w-full p-4">
                <div className="">
                    <h1>Total Counts:</h1>
                </div>
                <div className="flex gap-4">
                <div className=" flex flex-col gap-4 border-[1px] border-green-600 rounded-sm p-3">
                    <h1>
                        {
                            totalPosts
                        }
                    </h1>
                    <span>Total Posts</span>
                </div>
                <div className=" flex flex-col gap-4 border-[1px] border-green-600 rounded-sm p-3">
                    <h1>
                        {
                            totalLikes
                        }
                    </h1>
                    <span>Total Likes</span>
                </div>
                <div className=" flex flex-col gap-4 border-[1px] border-green-600 rounded-sm p-3">
                    <h1>
                        {
                            totalViews
                        }
                    </h1>
                    <span>Total Views</span>
                </div>
                <div className=" flex flex-col gap-4 border-[1px] border-green-600 rounded-sm p-3">
                    <h1>
                        {
                            totalSaves
                        }
                    </h1>
                    <span>Total Saves</span>
                </div>
                </div>
            </div>
            <div className="flex md:flex-row flex-col gap-2 items-center justify-between w-full p-4">
                <div className="">
                    <h1>Popular Posts:</h1>
                </div>
                <ul className="flex gap-4">
                {
                    popularPosts.map(post => (
                        <Link to={`/post/${post.$id}`} key={post.$id}>
                        <li className="relative flex flex-col gap-4 border-[1px] border-green-600 rounded-sm p-3 overflow-hidden group">
                            <img 
                            src={appwriteService.getFilePreview(post.featuredImage)} 
                            alt={post.title} 
                            width="77"
                            className="rounded-sm"
                            />
                            {/* Stats div that appears from the left on hover */}
                            <div 
                            className="absolute top-0 left-0 h-full w-full flex flex-col justify-center gap-2 bg-opacity-80 bg-white p-4 
                                        -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
                            >
                            <p className='text-black'><i className='fa-heart fa-regular'></i> {post.likes}</p>
                            <p className='text-black'><i class="fa-regular fa-eye"></i> {post.reads}</p>
                            <p className='text-black'><i className='fa-regular fa-bookmark'></i> {post.saveIds.length}</p>
                            </div>
                        </li>
                        </Link>
                    ))
                }

                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
