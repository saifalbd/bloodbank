
 import {cloneDeep, hasIn, isUndefined} from 'lodash';

 import Cookies from 'js-cookie'
import { auth } from '@/firebase';

import { api} from '@/api/types'
import router from '@/router/index'

import qs from 'qs'
class cl{

  

  static get authKey(){
       return 'auth';
   }

   static setThum(thumb:api.response.image){
    let key = `${cl.authKey}.profile-thumb`;
    let v = JSON.stringify(thumb);
  localStorage.setItem(key,v)
  console.log('auth profile thumb are creted or updated');
   }

   static getThum(){
    let key = `${cl.authKey}.profile-thumb`;
  let value:string = localStorage.getItem(key) as string;
 return JSON.parse(value) as  api.response.image;
   }

   static removeThum(){
    let key = `${cl.authKey}.profile-thumb`;
 localStorage.removeItem(key)

   }
   
   

    static async setProfile(profile:api.response.profile){
     
      if (profile.thumb != undefined && profile.thumb != null) {
        cl.setThum(profile.thumb)
      }
        let key = `${cl.authKey}.profile`;
        let v = JSON.stringify(profile);
        
      localStorage.setItem(key,v)

      console.log('auth profile are creted');
      

    }

    static profile() :null | api.response.profile{
        let key = `${cl.authKey}.profile`;

        let value:string = localStorage.getItem(key) as string;
       
        let p =JSON.parse(value) as  api.response.profile;
        p.thumb = cl.getThum();
        
        
        return p;

    }

    static profileRemove():cl{
      let key = `${cl.authKey}.profile`;

      localStorage.removeItem(key)

      return cl;
     

  }
    

   static  attempt(user:firebase.User){

    let data:any = user.providerData[0];

    if (!isUndefined(user.emailVerified )) {
        data.emailVerified
    }

    let v= JSON.stringify(data)

    localStorage.setItem(cl.authKey,v)
    console.log('auth  or updated');
    return cl.auth();
   

    }

  static auth(): firebase.auth.UserMetadata {
      let value = localStorage.getItem(cl.authKey) as string
     let a = JSON.parse(value) ;
     return a;
  }


  static check(){
    
    return  auth.currentUser?.uid || cl.auth()?.uid;
      
  }

  static id(){
      return (cl.auth() as any).uid;
  }

  static removeAuth(){
    localStorage.removeItem(this.authKey)
  }


 
    
  static async logOut(){
    
    
    cl.profileRemove()
    cl.removeThum();
    cl.removeAuth();
    localStorage.removeItem('vuex');
      // log user out
      await auth.signOut()
      // redirect to login view
      router.push({name:'Login'})
    }
}


export const LocalAuth = cl;