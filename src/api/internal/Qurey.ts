
import { usersCollection, postsCollection, commentsCollection, auth } from '@/firebase';
import { LocalAuth } from '@/plugins/LocalAuth';
import { hasIn, isPlainObject } from 'lodash';

export class Qurey {

    constructor() {


    }


     logged():typeof LocalAuth {
        return LocalAuth;
    }


    /* ------------------------------------------------
                relationship start
    ------------------------------------------------------*/

    protected posts(userId: string): firebase.firestore.Query {
        return postsCollection.where('userId', '==', userId);
    }


    protected comments(modelID: string): firebase.firestore.Query {
        return commentsCollection.where('userId', '==', modelID);
    }
    protected users(modelID: string): firebase.firestore.Query {
        return usersCollection.where('userId', '==', modelID);
    }

    protected comment(commentId: string): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
        return commentsCollection.doc(commentId);
    }
    protected post(postId: string): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
        return postsCollection.doc(postId);
    }

    protected user(userId: string): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
        return usersCollection.doc(userId);
    }

    /* ------------------------------------------------
              relationship end
  ------------------------------------------------------*/


    /* ------------------------------------------------
               mixing start
    ------------------------------------------------------*/

  protected  mixId(doc:firebase.firestore.DocumentData):firebase.firestore.DocumentData{
       try {
        let data = doc.data();
        
        if (isPlainObject(data)) {
            if (hasIn(doc,'id')) {
                return {id:doc.id,...data}
            }
        
            
        }
    
       } catch (error) {
           console.log(error);
           
       }

       return {};


    }

      /* ------------------------------------------------
               mixing end
    ------------------------------------------------------*/





}