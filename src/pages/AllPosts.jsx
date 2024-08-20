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
        <div className='w-full py-8'>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4">
                {posts.map((post) => (
                    <div className="p-2 " key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
                </div>
            </Container>
        </div>
    ) : (
        <div className=" h-screen w-full flex items-center justify-center">
            <Loader />
        </div>
    )
}

export default AllPosts;
