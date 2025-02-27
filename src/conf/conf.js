const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteLikesCollectionId: String(import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID),
    appwriteSaveCollectionId: String(import.meta.env.VITE_APPWRITE_SAVE_COLLECTION_ID),
    appwriteActiveReadersCollectionId: String(import.meta.env.VITE_APPWRITE_ACTIVE_READERS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteApiKey: String(import.meta.env.VITE_API_KEY),
    rteapikey: String(import.meta.env.VITE_RTE_API_KEY),
    proxyServer: String(import.meta.env.VITE_PROXY_SERVER)

}

export default conf