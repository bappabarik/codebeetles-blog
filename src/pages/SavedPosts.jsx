import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { Query } from 'appwrite';
import { Container, Loader, PostCard } from '../components';
import { addProgress, setLoading } from '../store/progressBarSlice';

const SavedPosts = () => {
    const posts = useSelector((state) => state.post.posts);
    const userData = useSelector((state) => state.auth.userData)
    const loading = useSelector(state => state.progressBar.loading)
    const [savedPosts, setSavedPosts] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addProgress(40))
        dispatch(setLoading(true))
        setSavedPosts([])
        if (posts && posts.length > 0) {
            const data = appwriteService.getSavedPosts('','', [Query.equal("userId", userData.$id)]);
            dispatch(addProgress(60))
            data.then((res) => {
                dispatch(addProgress(80))
                const savedPostsArray = [];
                res.documents.forEach(like => {

                    const matchedPost = posts.find(post => post.$id === like.slug)
                    if (matchedPost) {
                        savedPostsArray.push(matchedPost);  // Collect matching posts
                    }
                    console.log('running...');
                    
                })
                setSavedPosts(savedPostsArray)
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
        return  savedPosts.length > 0 ? (<div className='w-full py-8 max-h-full'>
            <Container>
                <div className="w-full flex justify-start items-start p-4 border-b-[1px] border-gray-500 mb-2">
                    <h1 className='dark:text-white'>Saved Posts</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                {savedPosts?.map((post) => (
                    <div className="p-2 " key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
                </div>
            </Container>
        </div>) :  (
            <Container>
                <div className="w-full flex justify-start items-start p-4 border-b-[1px] border-gray-500 mb-2">
                    <h1 className='dark:text-white'>Saved Posts</h1>
                </div>
                <div className="w-full h-screen flex justify-center items-center p-4 border-b-[1px] border-gray-500 mb-2">
                    <h1 className='dark:text-white'>You don't have any posts saved yet</h1>
                </div>
            </Container>
        )
    } else {
        return (<div className=" h-screen w-full flex items-center justify-center">
                    <Loader />
                </div>)
    }
    
    
}

export default SavedPosts;
