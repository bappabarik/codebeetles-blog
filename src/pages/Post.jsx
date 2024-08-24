import React, { useState, useEffect } from 'react';
import parse from "html-react-parser"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from "../appwrite/config"
import { Button, Container, Loader } from '../components';
import { addProgress, setLoading } from '../store/progressBarSlice';
import sdkService from '../appwrite/sdk';

const Post = () => {
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [author, setAuthor] = useState('fetching..')
    const [timeStamp, setTimeStamp] = useState('')
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const dispatch = useDispatch()

    useEffect(() => {
        if (slug) {
            dispatch(addProgress(40))
            dispatch(setLoading(true))
            appwriteService.getPost(slug)
            .then((post) => {
                if(post) {
                    setPost(post)
                    setLikes(post.like)
                    const find = post.userIds.find(user => user === userData.$id)
                    find ? setIsLiked(true) : setIsLiked(false)
                }
                else {
                    navigate("/")
                };
                dispatch(addProgress(100))
                dispatch(setLoading(false))
            })
        } else navigate("/")
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id)
        .then(status => {
            if(status){
                appwriteService.deleteFile(post.featuredImage)
                navigate("/")
            }
        }) 
    }

    function formatDateTime(dateTime){
        const created = new Date(dateTime);

        const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
        };

        const formattedDate = created.toLocaleDateString('en-US', options);
        setTimeStamp(formattedDate)
    }

    

    useEffect(() => {
        if (post) {
            sdkService.getUserName(post.userId)
            .then(name => setAuthor(name))
            .catch(error => console.log(error))

            formatDateTime(`${post.$createdAt}`)
        }
    }, [post])

    // useEffect(() => {
    //     const find = post.userIds.find(user => user === userData.$id)
    //     find ? setIsLiked(true) : setIsLiked(false)
    // }, [post]);

    const updateLikes = async () => {
        const find = await post.userIds.find(user => user === userData.$id)
        
        if (find) {
            const updatedPost = appwriteService.updatePost(slug, {
                like: `${Number(post.like) - 1}`,
                userIds: post.userIds.filter(user => user !== find)
            })

            updatedPost.then(data => {
                setLikes(data.like)
                setPost(data)
                setIsLiked(false)
            })
        } else {
            const updatedPost = appwriteService.updatePost(slug, {
                like: `${Number(post.like) + 1}`,
                userIds: [...post.userIds, userData.$id]
            })
            updatedPost.then(data => {
                setLikes(data.like)
                setPost(data)
                setIsLiked(true)
            })
        }
        
    }
    
    
    // console.log(`${post.like}`);
    
    return post ? (
        <div className='py-8'>
            <Container>
                <div className=" border-b-[1px] border-slate-400 flex justify-between pb-1 mb-6 items-center">
                <span className='dark:text-slate-400 text-slate-700 md:text-sm text-xs text-center self-center'>
                🖋️ {`${author} : ${timeStamp}`}
                {
                    post.status === "active" ? (<span className='text-[8px] text-center self-center ml-1'>🟢</span>): (<span className='text-[8px] text-center self-center ml-1'>🔴</span>)
                }
                </span>
                {
                    isAuthor && (
                        <div className="align-middle flex md:gap-6 gap-0">
                            <Link
                            to={`/edit-post/${post.$id}`}>
                                <Button
                                bgColor=''
                                className='dark:hover:bg-slate-700 hover:bg-slate-400 px-3 py-1 rounded-md'
                                >
                                    <i className="fa-solid fa-pen dark:text-slate-100 text-slate-800"></i>
                                </Button>
                            </Link>
                            <Button
                            bgColor=''
                            className='dark:hover:bg-slate-700 hover:bg-slate-400 px-3 py-1 rounded-md'
                            onClick={deletePost}
                            >
                               <i className="fa-solid fa-trash dark:text-slate-100 text-slate-800"></i>
                            </Button>
                        </div>
                    )
                }
                </div>
                <div className="w-full mb-6 dark:bg-slate-800 bg-gray-100 shadow-md p-6 rounded-md">
                    <h1 className="md:text-2xl font-bold dark:text-white">
                        {post.title}
                    </h1>
                </div>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title}
                    className='rounded-xl object-cover bg-contain' width="600"
                    />
                </div>
                <div className=" ">
                    <div className="browser-css dark:bg-slate-800 bg-gray-100 shadow-md dark:text-white p-6 rounded-md">
                        {parse(post.content)}
                    </div>
                </div>
                { post.like && (
                        <div className="mt-5">
                            <Button
                            onClick={updateLikes}
                            className='text-white px-4 py-3 bg-slate-500 rounded-lg text-xl'>
                            <i className={`${ isLiked ? 'fa-solid' : 'fa-regular' } fa-heart text-2xl `}></i>
                            {"  "}
                            {likes}
                            </Button>
                        </div>)
                }
            </Container>
        </div>
    ) : (<div className=" h-screen w-full flex items-center justify-center">
        <Loader />
      </div>);
}

export default Post;
