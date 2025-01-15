import React, {useState, useEffect} from 'react';
import appwriteService from "../appwrite/config";
import { Container, Loader, PostCard } from '../components/index';
import { addProgress, setLoading } from '../store/progressBarSlice';
import { useDispatch, useSelector } from 'react-redux';

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const loading = useSelector(state => state.progressBar.loading)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(setLoading(true))
        dispatch(addProgress(30))
        appwriteService.getPosts([])
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)    
            }
            dispatch(addProgress(100))
        })
        .catch((error) => {
            console.log(error);
            dispatch(setLoading(false))
            dispatch(addProgress(100))

        })
        .finally(() => {
            dispatch(setLoading(false))
        })   
    }, []);
 
    return !loading ? (
            <Container>
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 gap-4">
            <header className="w-full p-6 bg-green-600 text-white shadow-md">
                <h1 className="text-2xl font-bold">All Posts</h1>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-4">
            {posts.map((post) => (
                    <div className="p-2 " key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </main>
            </div>
            </Container>
    ) : (
        <div className=" h-screen w-full flex items-center justify-center">
            <Loader />
        </div>
    )
}

export default AllPosts;
