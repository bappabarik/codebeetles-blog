import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

const InactivePosts = () => {
    const posts = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData)
    const [inactivePosts, setInactivePosts] = useState([])

    useEffect(() => {
        const filterPosts = posts.filter(post => post.userId === userData.$id && post.status === 'inactive')
        
        if (filterPosts) {
            setInactivePosts(filterPosts)
        }
    }, [posts, userData])


    return inactivePosts.length > 0 ? (
        <div className='w-full py-8 max-h-full'>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4">
                {inactivePosts?.map((post) => (
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
                            There is no post available. 
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default InactivePosts;
