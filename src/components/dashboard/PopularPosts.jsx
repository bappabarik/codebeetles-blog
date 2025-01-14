import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import appwriteService from '../../appwrite/config';
import LazyLoad from 'react-lazyload';

const PopularPosts = () => {
    const posts = useSelector(state => state.post.posts);
    const userData = useSelector(state => state.auth.userData);
    const [popularPosts, setPopularPosts] = useState([]);


    const weights = { likes: 2, reads: 1, saves: 3 };

    function calculatePopularityScore(post, weights) {
        return (weights.likes * post.likes) + (weights.reads * post.reads) + (weights.saves * post.saveIds.length);
    }

    function getPopularPosts(posts, weights, limit = 4) {
        return posts
            .map(post => ({
                ...post,
                popularityScore: calculatePopularityScore(post, weights),
            }))
            .sort((a, b) => b.popularityScore - a.popularityScore)
            .slice(0, limit);
    }



    useEffect(() => {
        const userPosts = posts.filter(post => post.userId === userData.$id);
        setPopularPosts(getPopularPosts(userPosts, weights));
    }, [posts, userData]);
    return (
        <section>
                    <h2 className="text-xl font-semibold mb-4">Popular Posts</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularPosts.map(post => (
                            <li key={post.$id} className="relative group overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
                                <Link to={`/post/${post.$id}`} className="block">
                                    <LazyLoad height={200} offset={100} once>
                                        <img 
                                            src={appwriteService.getFilePreview(post.featuredImage)} 
                                            alt={post.title} 
                                            className="w-full h-40 object-cover rounded-t-lg"
                                        />
                                    </LazyLoad>
                                    <div className="p-4">
                                        <h3 className="text-md font-semibold truncate">{post.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{post.excerpt}</p>
                                    </div>
                                </Link>
                                <div 
                                    className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center gap-2 
                                    bg-opacity-90 bg-white dark:bg-gray-900 p-4 -translate-x-full 
                                    group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
                                >
                                    <p className="text-black dark:text-white flex items-center gap-1">
                                        <i className="fa-regular fa-heart"></i> {post.likes}
                                    </p>
                                    <p className="text-black dark:text-white flex items-center gap-1">
                                        <i className="fa-regular fa-eye"></i> {post.reads}
                                    </p>
                                    <p className="text-black dark:text-white flex items-center gap-1">
                                        <i className="fa-regular fa-bookmark"></i> {post.saveIds.length}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
    );
}

export default PopularPosts;
