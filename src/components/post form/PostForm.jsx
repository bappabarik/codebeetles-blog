import React, {useCallback, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Button, Input, RTE, Select} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, removePost, updatePost } from '../../store/postSlice';
import {AiHelper} from "../index";
import { useEditor } from '../../Context/EditorContext';

const PostForm = ({post}) => {
    const {register, handleSubmit, watch, setValue, control, getValues, formState: {errors, isSubmitting}} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })
    // const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);

    const { isActive } = useEditor()

    const submit = async (data) => {      
        setLoading(true)
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            if (post.slug !== data.slug) {
                appwriteService.deletePost(post.$id)
                dispatch(removePost(post))

                const dbPost = await appwriteService.createPost({
                $id: data.slug,
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
                userId: userData.$id,
                like: post.like
                });

                if (dbPost) {
                dispatch(addPost(dbPost))
                navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
    
                if (dbPost) {
                    dispatch(updatePost(dbPost))
                    navigate(`/post/${dbPost.$id}`);
                }
            }
            
            

        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id, like: 0 });

                if (dbPost) {
                    dispatch(addPost(dbPost))
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        setLoading(false)
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title" && value.title.length <= 36) {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

       

    return (
        <>
        <form onSubmit={handleSubmit(submit)} className='flex md:flex-row flex-wrap flex-col md:items-start items-center w-full'>
            <div className="md:w-2/3 w-full px-2">
            <Input 
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", {
                required: {value: true, message: "Title is required"},
                minLength: {value: 4, message: "Minimum length is 4"},
                maxLength: {value: 200, message: "Maximum length is 200"}
            })}
            />
            {
                errors.title && (<span className='text-red-600 mt-2'>{errors.title.message}</span>)
            }
           <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { 
                    required: {value: true, message: "Slug is required"},
                    minLength: {value: 4, message: "Minimum length is 4"},
                    maxLength: {value: 200, message: "Maximum length is 36"}
                })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            {
                errors.slug && (<span className='text-red-600 mt-2'>{errors.slug.message}</span>)
            }
            <RTE 
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            />
            </div>
            <div className="md:w-1/3 w-full px-2">
                <Input 
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {required: {value: !post, message: "Image is required"}})}
            />
            {
                errors.image && (<span className='text-red-600 mt-2'>{errors.image.message}</span>)
            }
            {post && (
                <div className="w-full mb-4">
                    <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title}
                    className='rounded-lg'
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="status :"
                className='mb-4'
                {...register("status", {required: true})}
            />
            <Button 
                type='submit'
                bgColor={post ? "bg-green-500" : undefined}
                disabled={isSubmitting}
                className={`w-full text-center px-4 py-2 rounded-lg ${isSubmitting ? 'bg-opacity-60' : null}`}>
                    {post ? "Update" : "Publish"}
                    {loading && <span className='animate-spin inline-block ml-3 text-center'><i className="fa-solid fa-spinner self-center"></i></span>}
            </Button>
                
            </div>
        </form>
        <div className="md:w-[60%] w-full self-start relative mt-5 left-0">
          {isActive && <AiHelper />}
        </div>
        </>
    );
}

export default PostForm;