import React, {useEffect, useState} from 'react';
import { Button, Container, Loader, Logo, PostCard, Search } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProgress, setLoading } from '../store/progressBarSlice';
import authService from '../appwrite/auth';
import { setInitialTheme } from '../store/themeSlice';

const Home = () => {
    const posts = useSelector(state => state.post.posts)
    const postStatus = useSelector(state => state.post.postStatus)
    const error = useSelector(state => state.post.error)
    const status = useSelector(state => state.auth.status)
    const loading = useSelector(state => state.progressBar.loading)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [activePosts, setActivePosts] = useState([])


    useEffect(() => {
        authService.getPreferences()
        .then(theme => {
        if (theme) {
          document.querySelector('body').classList.add("dark")
        } else {
          document.querySelector('body').classList.add("light")
        }
        console.log("status", theme);
        
        dispatch(setInitialTheme(theme))
      })
      
    }, [])
    
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
                onClick={() => navigate('/login')} className='px-6 py-2 duration-200 hover:bg-opacity-90 rounded-md bg-blue-500 text-white text-lg m-2'>
                    Log In
                </Button>
                <Button onClick={() => navigate('/signup')} className="px-6 py-2 duration-200 hover:bg-opacity-90 bg-green-600 rounded-md text-lg m-2">
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
                            userData.name
                        },
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
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia expedita temporibus quibusdam sunt? Veritatis voluptatum sunt ea at omnis doloremque doloribus adipisci, explicabo quibusdam dignissimos esse officia debitis rem minima modi suscipit natus non fugiat in blanditiis assumenda quidem totam. Nulla dolorum veniam error fuga totam iste soluta quis repellendus placeat enim officia natus, cupiditate deserunt tempora incidunt inventore ipsam perferendis deleniti esse facere repellat ipsum laboriosam. Quo repellat laboriosam consequuntur qui eum officiis ad, maiores debitis magnam quas quod, quaerat deleniti. Omnis sit aliquid vel maxime, fugit iusto fugiat consectetur enim mollitia. Tempore sequi veritatis nam, at commodi nulla.