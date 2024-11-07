import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const posts = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData)
    const [totalLikes, setTotalLikes] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalViews, setTotalViews] = useState(0)
    const [totalSaves, setTotalSaves] = useState(0)

    
    useEffect(() => {
        const userPosts = posts.filter(post => post.userId === userData.$id)
        setTotalPosts(userPosts.length)
        setTotalLikes(userPosts.reduce((accumulator, currentValue) => accumulator + currentValue.likes,
        0))
        setTotalViews(userPosts.reduce((accumulator, currentValue) => accumulator + currentValue.reads,
        0))
        setTotalSaves(userPosts.reduce((accumulator, currentValue) => accumulator + currentValue.saveIds.length,
        0))
        console.log(userPosts);
    }, [posts]);
    
    
    
    return (
        <div className='flex justify-center min-h-screen items-start dark:text-white'>
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
    );
}

export default Dashboard;
