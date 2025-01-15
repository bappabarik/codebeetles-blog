import React, {useEffect, useState} from 'react';
import { Button, Container, Loader, PostCard, Search } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProgress, setLoading } from '../store/progressBarSlice';

const Home = () => {
    const posts = useSelector(state => state.post.posts)
    const postStatus = useSelector(state => state.post.postStatus)
    const loading = useSelector(state => state.progressBar.loading)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [activePosts, setActivePosts] = useState([])

    
    useEffect(() => {
        if (postStatus === "loading") {
            dispatch(setLoading(true));
            dispatch(addProgress(50));
        } else {
            dispatch(setLoading(false));
            dispatch(addProgress(100));
        }
        
    }, [postStatus, dispatch]);

    useEffect(() => {
        if (posts && posts.length > 0) {
            const allActivePosts = posts.filter(post => post.status === 'active')
        if (allActivePosts) {
            setActivePosts(allActivePosts)
        }
        }
    }, [posts])

  

    return !loading ? (
        <>
        
        {
        posts && posts.length === 0 ? (
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
        ) : (
            <div className='w-full pb-8'>
            <Container>
                <div className="text-white p-5  bg-gradient-to-r from-cyan-600 to-green-700 mb-4">
                    <h1 className=' text-4xl font-bold leading-relaxed'>
                        Hi {" "}
                        {
                            userData ? userData.name : (<span>you are not logged in please <Button
                                            onClick={() => navigate('/login')} className='px-6 py-2 duration-200 hover:bg-opacity-90 rounded-md bg-blue-500 text-white text-lg m-2'>
                                                Log In
                                            </Button></span>)
                        }
                        <br/>
                        Welcome to Codebeetles Blog</h1>
                    <p>Unleash your coding potential with our latest tips, tutorials, and insights. Dive into the world of development and stay ahead with expert knowledge tailored for you.</p>
                    <a href="#latest-posts" className="cta-button">Explore Latest Posts</a>
                </div>
                <div className=" py-8 my-6 md:pt-14 sticky z-10 top-[4rem] dark:bg-slate-900 bg-gray-50 w-full">
                    <Search posts={posts} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    {activePosts?.map((post) => (
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