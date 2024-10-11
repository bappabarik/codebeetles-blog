import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async updateName(newName){
        try {
            return await this.account.updateName(newName)
        } catch (error) {
            console.log("Appwrite service :: updateName :: error", error);
        }
    }

    async verifyEmail(){
        try {
            return await this.account.createVerification(
                'https://codebeetles-blog.vercel.app/confirm-email'
            )
        } catch (error) {
            console.log("Appwrite service :: verifyEmail :: error", error);
        }
    }

    async updateVerification(userId, key){
        try {
           return await this.account.updateVerification(
            userId,
            key
           )
        } catch (error) {
            return Promise.reject(error)
            console.log("Appwrite service :: updateVerification :: error", error);
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    
    async updatePreferences(theme){
        try {
            const promise = await this.account.updatePrefs({darkTheme: theme});            
            return promise
        } catch (error) {
            console.log(error);
            
        }
    }

    async getPreferences(){
        try {
            const prefs = await this.account.getPrefs();
            if (prefs.darkTheme === undefined) {
                return false
            }
            return prefs.darkTheme;
          } catch (error) {
            console.error("Error fetching preferences:", error);
            return false;
          }
    }
}

const authService = new AuthService();

export default authService

