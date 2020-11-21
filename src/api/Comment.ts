
import {auth, usersCollection,postsCollection,commentsCollection ,likesCollection} from '../firebase';
import { Model } from '@vuex-orm/core'

import { Qurey } from './internal/Qurey';

export default class Post  extends Qurey{

    public table:firebase.firestore.DocumentData;
    public model:typeof Model;

    constructor(model:typeof Model){
      super()

        this.table = commentsCollection;
        this.model = model;

    }
    
   async collection():Promise<Array<post> | Error>{
    try { 
    
        const snap  = await this.table.get();
        let data =  snap.docs.map((item:any):post =>{
            let id = item.id;
            let data =  item.data();
            data.id =id;
            return data;
        })
        this.model.create({data:data})
      
        return data;
        
       } catch (error) {
         console.log(error);

         return error;
          
     }

    }


    async collectionByPost(post:post):Promise<Array<post> | Error>{
        try { 
        
            const snap  = await this.table.where('postId' ,"==",post.$id).get();
            let data = await snap.docs.map((item:any):post =>{
                let id = item.id;
                let data =  item.data();
                data.id =id;
                return data;
            })


       
            this.model.create({data:data})
          
            return data;
            
           } catch (error) {
             console.log(error);
    
             return error;
              
         }
    
        }
    




    async hasLIke(post:post){
      const userId = (auth as any).currentUser.uid as any;
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

   async create(data:comment) {

    

        try {

           

             await commentsCollection.add(data)

              
              
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

    delete(id:any){

    }



}