
import {auth, usersCollection,postsCollection,commentsCollection ,likesCollection, imageCollection} from '../firebase';
import { Model } from '@vuex-orm/core'
import { LocalAuth } from '@/plugins/LocalAuth';

import { Qurey } from './internal/Qurey';

export default class Post extends Qurey{

    public table:firebase.firestore.DocumentData;
    public model:typeof Model;

    constructor(model:typeof Model){
      super()

        this.table = postsCollection;
        this.model = model;



    }


  

    
   async collection():Promise<Array<post> | Error>{
    try { 
    
        const snap  = await this.table.get();
        let data =  snap.docs.map((item:firebase.firestore.DocumentData):firebase.firestore.DocumentData =>{
            return this.mixId(item);
        })
        this.model.create({data:data})
      
        return data;
        
       } catch (error) {
         console.log(error);

         return error;
          
     }

    }


    async hasLIke(post:post){
      let localAuth =  LocalAuth.id()
      if (!localAuth) {
        return false;
      }
      const userId =localAuth;
      const docId = `${userId}_${post.$id}`

      const doc = await likesCollection.doc(docId).get()
      if (doc.exists) {  
        return true;
      }else {
        return false;
      }

    }


    async likeDown(post:post){
      await  this.table.doc(post.$id).update({
          likes: post.likes - 1
        })
  
  
        const userId = (auth as any).currentUser.uid as any;
        const docId = `${userId}_${post.$id}`
  
        // check if user has liked post
        const doc = await likesCollection.doc(docId).delete();
        // if (doc.exists) { return
        
        // }
  
      
  
       
  
        return  this.model.update({where:post.$id,data:{
          likes:post.likes - 1
        }});


      }
  

    async likeUp(post:post){
    await  this.table.doc(post.$id).update({
        likes: post.likes + 1
      })



      const userId = (auth as any).currentUser.uid as any;
      const docId = `${userId}_${post.$id}`

      // check if user has liked post
      const doc = await likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await likesCollection.doc(docId).set({
        postId: post.$id,
        userId: userId
      })
      


     

      return  this.model.update({where:post.$id,data:{
        likes:post.likes + 1
      }});
    }

    

  async  update(post:post,obj:{[key:string]:any}){

    

    }

   async create(obj:post) {

    

        try {

            let data = {
                createdOn: Date.now()-1000,
                content: obj.content,
                userId: obj.userId,
                by:obj.by,
                comments: 0,
                likes: 0
              }

             await postsCollection.add(data )

              
              
            //   console.log(userProfile);
              

      return  this.model.insert({data});

    

       
            
        } catch (e) {
            return e;
            
        }

    }

   async show(userId:any){

        const userProfile = await usersCollection.doc(userId).get();

        return userProfile;

    }

  async  delete(id:any){
    try {
      let res = await imageCollection.doc(id).delete();
      return res;
      
    } catch (error) {
      console.log(error);
      
      
      return error;
    }

      

    }



}