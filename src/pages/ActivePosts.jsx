import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ActivePosts = () => {
    const posts = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData)
    const [activePosts, setActivePosts] = useState([])
    const navigate = useNavigate()
    

    useEffect(() => {
        const filterPosts = posts.filter(post => post.userId === userData.$id && post.status === 'active')
        if (filterPosts) {
            
            setActivePosts(filterPosts)
        }
    }, [posts, userData])
    

    return activePosts.length > 0 ? (
        <div className='w-full py-8'>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4">
                {activePosts?.map((post) => (
                    <div className="p-2 " key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
                </div>
            </Container>
        </div>
    ) : (
        <div className="w-full py-8 mt-4 text-center max-h-screen ">
             <Container>
                 <div className="flex flex-wrap">
                     <div className="p-2 w-full">
                         <h1 className='text-2xl font-bold dark:text-white'>
                            There is no post available please add one. 
                        </h1>
                        <button 
                            onClick={() => navigate('/add-post')}
                            className='inline-bock px-6 py-2 duration-200 dark:text-white hover:bg-blue-100 rounded-full'
                            >
                                Add post
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ActivePosts;
