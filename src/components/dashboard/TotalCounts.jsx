import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TotalCounts = () => {
    const posts = useSelector(state => state.post.posts);
    const userData = useSelector(state => state.auth.userData);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalViews, setTotalViews] = useState(0);
    const [totalSaves, setTotalSaves] = useState(0);

    useEffect(() => {
        const userPosts = posts.filter(post => post.userId === userData.$id);
        setTotalPosts(userPosts.length);
        setTotalLikes(userPosts.reduce((acc, cur) => acc + cur.likes, 0));
        setTotalViews(userPosts.reduce((acc, cur) => acc + cur.reads, 0));
        setTotalSaves(userPosts.reduce((acc, cur) => acc + cur.saveIds.length, 0));
    }, [posts, userData]);
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[{
                        label: 'Total Posts',
                        value: totalPosts,
                    }, {
                        label: 'Total Likes',
                        value: totalLikes,
                    }, {
                        label: 'Total Views',
                        value: totalViews,
                    }, {
                        label: 'Total Saves',
                        value: totalSaves,
                    }].map((stat, index) => (
                        <div key={index} className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                            <h2 className="text-3xl font-semibold text-green-600">{stat.value}</h2>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </section>
    );
}

export default TotalCounts;
