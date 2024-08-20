import React, {useState, useEffect} from 'react';
import appwriteService from "../appwrite/config";
import { Button, Container, Loader, Logo, PostCard, Search } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProgress, setLoading } from '../store/progressBarSlice';

const Home = () => {
    const [posts, setPosts] = useState([])
    const status = useSelector(state => state.auth.status)
    const loading = useSelector(state => state.progressBar.loading)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(addProgress(20))
        appwriteService.getPosts()
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            dispatch(addProgress(100))
        })
        .catch((error) => {
            console.log(error);
            dispatch(addProgress(100))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })

        
    }, []);

    if (!status) {
        return (
            <div className="w-full text-center ">
            <Container>
            <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full dark:bg-slate-800 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold dark:text-slate-100 text-center mb-1">Welcome to</h1>
                <Logo width='300px' />
                <p className="text-gray-500 text-center my-6">
                Join us today to enjoy all the benefits of our platform. Please log in or sign up to get started!
                </p>
                <div className="flex justify-center space-x-4">
                <Button
                onClick={() => navigate('/login')} className='px-6 py-2 duration-200 hover:bg-opacity-30 border border-blue-500 bg-blue-500 bg-opacity-20 text-blue-500 font-mono text-lg m-2'>
                    Log In
                </Button>
                <Button onClick={() => navigate('/signup')} className="px-6 py-2 duration-200 hover:bg-opacity-30 border border-green-500 bg-green-500 bg-opacity-20 text-green-600 font-mono text-lg m-2">
                    Sign Up
                </Button>
                </div>
            </div>
            </div>
        </Container>
        </div>
    )
    }
  

    return !loading ? (
        <>
        
        {
        posts.length === 0 ? (
            <div className="w-full py-8 mt-4 text-center max-h-screen ">
                 <Container>
                     <div className="flex flex-wrap">
                         <div className="p-2 w-full">
                             <h1 className='text-2xl font-bold dark:text-white'>
                                There is no post available please add one. 
                            </h1>
                            <button 
                                onClick={() => navigate('/add-post')}
                                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                >
                                    Add post
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        ) : (
            <div className='w-full pb-8'>
            <Container>
                <div className="text-white p-5  bg-gradient-to-r from-cyan-600 to-green-700 mb-4">
                    <h1 className=' text-4xl font-bold leading-relaxed'>Welcome to Codebeetles Blog</h1>
                    <p>Unleash your coding potential with our latest tips, tutorials, and insights. Dive into the world of development and stay ahead with expert knowledge tailored for you.</p>
                    <a href="#latest-posts" className="cta-button">Explore Latest Posts</a>
                </div>
                <div className=" p-8 mb-8">
                    <Search posts={posts} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    {posts.map((post) => (
                        <div className="p-2" key={post.$id}>
                            <PostCard {...post} />    
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        )
    }
    
    </>
    ) : (<div className=" h-screen w-full flex items-center justify-center">
        <Loader />
      </div>)
    }

export default Home;
