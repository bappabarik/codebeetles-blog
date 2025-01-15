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
        return  likedPosts.length > 0 ? (
            <Container>
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 gap-4">
            <header className="w-full p-6 bg-green-600 text-white shadow-md">
                <h1 className="text-2xl font-bold">Liked Posts</h1>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-4">
            {likedPosts?.map((post) => (
                    <div className="p-2 " key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </main>
        </div>
            </Container>) :  (
            <Container>

            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="w-full p-6 bg-green-600 text-white shadow-md">
                <h1 className="text-2xl font-bold">Liked Posts</h1>
            </header>
                <div className="w-full h-screen flex justify-center items-center p-4 border-b-[1px] border-gray-500 mb-2">
                    <h1 className='dark:text-white'>You don't have liked any post yet</h1>
                </div>
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
