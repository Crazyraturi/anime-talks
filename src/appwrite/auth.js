
import conf from "../conf/conf";

import { Client,Account,ID } from "appwrite";

export  class Authservice{
     Client = new Client();
    account;

     constructor(){
        this.Client.setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid);
        this.account = new Account(this.Client);
     }


     async createAccount({email,password,name}){
        try {
            const userAccount =await this.account.create( ID.unique(),email,password,name);

            if (userAccount) {
                //calling another method
                this.account.login({email,password})
            } else {
                return userAccount;
                
            }
            
        } catch (error) {
            throw error;
            
        }
     }


     async login({email,password}){
        try {
         return await  this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            throw error;
        }
     }

     async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
            throw error;
            
        }

        return null;

     }

     async logout(){
        try { 
            await this.account.deleteSessions();
            
        } catch (error) {
            throw error;
            
        }
     }

}

const authservice = new Authservice();

export default authservice;