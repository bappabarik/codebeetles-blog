import React, { useState, useEffect } from 'react';
import parse from "html-react-parser"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from "../appwrite/config"
import { Button, Container, Loader } from '../components';
import { addProgress, setLoading } from '../store/progressBarSlice';
import sdkService from '../appwrite/sdk';
import { removePost, updatePost } from '../store/postSlice';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState()
    const [likeId, setLikeId] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [saveId, setSaveId] = useState('')
    const [reads, setReads] = useState()
    const [likeBtnDisable, setLikeBtnDisable] = useState(false)
    const [saveBtnDisable, setSaveBtnDisable] = useState(false)
    const [timeSpent, setTimeSpent] = useState(0);
    const [scrolledToEnd, setScrolledToEnd] = useState(false);
    const [author, setAuthor] = useState('fetching..')
    const [timeStamp, setTimeStamp] = useState('')
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const dispatch = useDispatch()   
    const { pathName } = useLocation()
    // const [country, setCountry] = useState('')
    
    //scroll to the top of the every time the post get clicked
    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathName])


    //loading the post using getPost method with slug value then updating the states
    useEffect(() => {
        if (slug) {
            dispatch(addProgress(40))
            dispatch(setLoading(true))
            appwriteService.getPost(slug)
            .then((post) => {
                if(post) {
                    setPost(post)

                    //after getting the post loading the likes in the state in number formate
                    setLikes(post.likes)
                    
                    //after getting the post loading the reads in the state in number formate
                    setReads(post.reads)

                    //check whether user is already liked it or not
                    const findLikes = appwriteService.getLikes(slug, userData.$id)
                    findLikes.then(data => { 
                        if(data.documents.length > 0) {
                            setIsLiked(true)
                            setLikeId(data.documents[0].$id)
                        } else {
                            setIsLiked(false)
                            setLikeId('')
                        }
                    })
                    .catch(error => console.log("Error finding liked id:", error))


                    //check whether user is already saved it or not
                    const findSavedPost = appwriteService.getSavedPosts(slug, userData.$id)
                    findSavedPost.then(data => { 
                        if(data.documents.length > 0) {
                            setIsSaved(true)
                            setSaveId(data.documents[0].$id)
                        } else {
                            setIsSaved(false)
                            setSaveId('')
                        }
                    })
                    .catch(error => console.log("Error finding liked id:", error))
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
                likeId && appwriteService.deleteLike(likeId)
                saveId && appwriteService.deleteSavedPost(saveId)
                dispatch(removePost(post))
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


    const updateLikes = () => {
        if (likeBtnDisable) return
        setLikeBtnDisable(true)
        appwriteService.newLike(slug, userData.$id)
        .then(data => 
        {   
            if (data) {
                setLikes(likes + 1);
                setIsLiked(true);
                setLikeId(data.$id);
                const updatedPost = appwriteService.updatePost(slug, {
                    likes: likes + 1,
                    likeIds: [...post.likeIds, data.$id]
                })

                updatedPost.then(updatedData => {
                    dispatch(updatePost(updatedData))
                    setPost(updatedData)
                    setLikeBtnDisable(false)
                })
                .catch(error => {
                    console.log("updatePost",error)
                    setLikes(likes - 1)
                    setIsLiked(false)
                    setLikeId('')
                    setLikeBtnDisable(false)
                }
                )
            } else {
                setLikes(likes - 1);
                setIsLiked(false);
                const updatedPost = appwriteService.updatePost(slug, {
                    likes: likes - 1,
                    likeIds: post.likeIds.filter(id => id !== likeId)
                })
    
                updatedPost.then(updatedData => {
                    dispatch(updatePost(updatedData))
                    setPost(updatedData);
                    setLikeBtnDisable(false);
                    setLikeId('');
                })
                .catch(error => {
                    console.log("updatePost", error);
                    setLikes(likes + 1);
                    setIsLiked(true);
                    setLikeBtnDisable(false);
                });
            }
        })
        .catch(error => {
            console.log("newLike", error);
            setLikeBtnDisable(false);
        });
    }

    const savePost = () => {
        if (saveBtnDisable) return
        setSaveBtnDisable(true)
        appwriteService.savePost(slug, userData.$id)
        .then(data => {
            if(data) {
                setIsSaved(true)
                setSaveId(data.$id)

                const updatedPost = appwriteService.updatePost(slug, {
                    saveIds: [...post.saveIds, data.$id]
                })

                updatedPost.then(updatedData => {
                    dispatch(updatePost(updatedData))
                    setPost(updatedData)
                    setSaveBtnDisable(false)
                })
                .catch(error => {
                    console.log("updatePost", error)
                    setIsSaved(false)
                    setSaveId('')
                    setSaveBtnDisable(false)
                })
            } else {
                setIsSaved(false)
                const updatedPost = appwriteService.updatePost(slug, {
                    saveIds: post.saveIds.filter(id => id !== saveId)
                })

                updatedPost.then(updatedData => {
                    dispatch(updatePost(updatedData))
                    setPost(updatedData)
                    setSaveBtnDisable(false)
                    setSaveId('')
                })
                .catch(error => {
                    console.log("updatePost", error)
                    setIsSaved(true)
                    setSaveBtnDisable(false)
                })
            }
        })
    }

    useEffect(() => {
        const startTime = Date.now();

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
    
            // Check if the user has scrolled to 75% of the page or more
            if (scrollPosition >= pageHeight * 0.75) {
            setScrolledToEnd(true);
            console.log("handleScroll running...");
            
            }
        };

        
    
        const handleRouteChange = () => {
            const timeOnPage = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
            setTimeSpent(timeOnPage);
            console.log("function called");
            
            // Increment read count only if both conditions are met
            if (timeOnPage >= 30 && scrolledToEnd) {
                console.log("handleBeforeload running...");
                getCountry()
                .then(data => {
                    incrementReadCount(data.data.country);
                })

            }
        };
    
        window.addEventListener('scroll', handleScroll);
        // window.addEventListener('visibilitychange', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // window.removeEventListener('visibilitychange', handleBeforeUnload);
            handleRouteChange()
        };
    }, [scrolledToEnd, pathName])

    const getCountry = async () => {
        return await axios.get('https://ipinfo.io/json');
    }

    const incrementReadCount = (country) => {

        try {
            const isReaderExist = appwriteService.getReaders(slug, userData.$id)
            console.log(isReaderExist);
            
            if (post.userId !== userData.$id) {
                isReaderExist.then(data => {

                if (data.documents.length > 0) {
                    const updatedPost = appwriteService.updatePost(slug, {
                        reads: post.reads + 1,
                    })
    
                    updatedPost.then((data) => {
                        dispatch(updatePost(data))
                    })
                    .catch(error => {
                        console.log(error);
                    })
                } else {
                    console.log(country);
                    
                    const newReader = appwriteService.createReader(slug, userData.$id, country)

                    console.log(newReader);

                    newReader.then(data => {
                        if (data) {
                            const updatedPost = appwriteService.updatePost(slug, {
                                reads: post.reads + 1,
                                readIds: [...post.readIds, data.$id]
                            })
            
                            updatedPost.then((data) => {
                                dispatch(updatePost(data))
                            })
                            .catch(error => {
                                console.log(error);
                            }) 
                        }
                    })
                }
            })
            } else {
                console.log("Its your post");
                
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    
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
                <div className="flex gap-4 items-center w-full justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="mt-5">
                            <Button
                            onClick={updateLikes}
                            className='text-white px-4 py-3 bg-slate-500 rounded-lg text-xl'
                            disabled={likeBtnDisable}
                            >
                            <i className={`${ isLiked ? 'fa-solid' : 'fa-regular' } fa-heart text-2xl `}></i>
                            {"  "}
                            {likes}
                            </Button>
                        </div>
                        <div className="mt-5">
                            <Button
                            onClick={savePost}
                            className='text-white px-4 py-3 bg-slate-500 rounded-lg text-xl'
                            disabled={saveBtnDisable}
                            >
                            <i className={`${ isSaved ? 'fa-solid' : 'fa-regular' } fa-bookmark text-2xl `}></i>
                            </Button>
                        </div>
                    </div>
                        <div className="p-2">
                            <span className='dark:text-white text-xl'>
                                Views: {reads}
                            </span>
                        </div>
                </div>
            </Container>
        </div>
    ) : (<div className=" h-screen w-full flex items-center justify-center">
        <Loader />
      </div>);
}

export default Post;
