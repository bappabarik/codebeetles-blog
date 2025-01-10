import conf from '../conf/conf.js';
import { Client, Users } from 'node-appwrite';

export class SdkService{
    client = new Client();
    users;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        .setKey(conf.appwriteApiKey);
        this.users =  new Users(this.client);
    }

    async getUserName(userId){
        try {
            const response = await this.users.get(userId);            
            return response
        } catch (error) {
            console.log(`ERROR:: getUserName :: ${error}`);
            
        }
    }
}

const sdkService = new SdkService();

export default sdkService