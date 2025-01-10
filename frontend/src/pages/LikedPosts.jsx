import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { Query } from 'appwrite';
import { Container, Loader, PostCard } from '../components';
import { addProgress, setLoading } from '../store/progressBarSlice';

const LikedPosts = () => {
    const posts = useSelector((state) => state.post.posts);
    const userData = useSelector((state) => state.auth.userData)
    const loading = useSelector(state => state.progressBar.loading)
    const [likedPosts, setLikedPosts] = useState([]);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(addProgress(40))
        dispatch(setLoading(true))
        setLikedPosts([])
        if (posts && posts.length > 0) {
            const data = appwriteService.getLikes('','', [Query.equal("userId", userData.$id)]);
            dispatch(addProgress(60))
            data.then((res) => {
                dispatch(addProgress(80))
                const likedPostsArray = [];
                res.documents.forEach(like => {

                    const matchedPost = posts.find(post => post.$id === like.slug)
                    if (matchedPost) {
                        likedPostsArray.push(matchedPost);  // Collect matching posts
                    }
                    console.log('running...');
                    
                })
                setLikedPosts(likedPostsArray)
                dispatch(addProgress(100))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log("error loading the liked posts", error);
                dispatch(addProgress(100))
                dispatch(setLoading(false))
            })
        }
    },[posts, userData.$id])
    
    if (!loading ) {
        return  likedPosts.length > 0 ? (<div className='w-full py-8 max-h-full'>
            <Container>
                <div className="w-full flex justify-start items-start p-4 border-b-[1px] border-gray-500 mb-2">
                    <h1 className='dark:text-white'>Liked Posts</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                {likedPosts?.map((post) => (
                    <div className="p-2 " key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
                </div>
            </Container>
        </div>) :  (
            <Container>
                <div className="w-full flex justify-start items-start p-4 border-b-[1px] border-gray-500 mb-2">
                    <h1 className='dark:text-white'>Liked Posts</h1>
                </div>
                <div className="w-full h-screen flex justify-center items-center p-4 border-b-[1px] border-gray-500 mb-2">
                    <h1 className='dark:text-white'>You don't have liked any post yet</h1>
                </div>
            </Container>
        )
    } else {
        return (<div className=" h-screen w-full flex items-center justify-center">
                    <Loader />
                </div>)
    }

}

export default LikedPosts;
