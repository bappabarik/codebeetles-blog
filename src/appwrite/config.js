import conf from "../conf/conf"
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId, likes, likeIds, saveIds}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    likes,
                    likeIds,
                    saveIds
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost( slug, {title, content, featuredImage, status, likes, likeIds, saveIds}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    likes,
                    likeIds,
                    saveIds
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async getLikes(slug, userId, queries = [Query.equal("slug", slug), Query.equal("userId", userId)]){
        try {
            // console.log(queries);
            
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                queries
            )
            
        } catch (error) {
            console.log("Appwrite service :: getLikes :: error", error);
        }
    }

    async newLike(slug, userId){
        try {
            const isLikeExist = this.getLikes(slug, userId)  

            return new Promise((resolve, reject) => {
            isLikeExist
            .then(data => {
                if (data.documents.length === 0){
                    const like = this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteLikesCollectionId,
                        ID.unique(),
                        {
                            slug,
                            userId
                        }
                    )
                    resolve(like)
                } else {
                    this.deleteLike(data.documents[0].$id)
                    resolve(false)
                }
            })
            .catch(error =>{ 
                console.log(error)
                reject(error)
            })
            })
            
        } catch (error) {
            console.log("Appwrite service :: newLike :: error", error);
        }
    }

    async deleteLike(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                id
            )
        } catch (error) {
            console.log("Appwrite service :: deleteLike :: error", error); 
        }
    }

    async getSavedPosts(slug, userId, queries = [Query.equal("slug", slug), Query.equal("userId", userId)]){
        try {
            // console.log(queries);
            
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteSaveCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getSavedPosts :: error", error);
        }
    }

    async savePost(slug, userId){
        try {
            const isPostSaved = this.getSavedPosts(slug, userId)
            return new Promise((resolve, reject) => {
                isPostSaved
                .then(data => {
                    if (data.documents.length === 0){
                        const save = this.databases.createDocument(
                            conf.appwriteDatabaseId,
                            conf.appwriteSaveCollectionId,
                            ID.unique(),
                            {
                                slug,
                                userId
                            }
                        )
                        resolve(save)
                    } else {
                        this.deleteSavedPost(data.documents[0].$id)
                        resolve(false)
                    }
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        } catch (error) {
            console.log("Appwrite service :: savePost :: error", error);
            
        }
    }

    async deleteSavedPost(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteSaveCollectionId,
                id
            )
        } catch (error) {
            console.log("Appwrite service :: deleteSavedPost :: error", error);
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service();
export default service
