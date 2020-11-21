import { Model } from '@vuex-orm/core'
//import { apiVariantOption } from '../api';


export default class Like extends Model {
    static entity = 'likes'
  
    static fields () {
      return {
        userId: this.attr(null),
        postId: this.attr(null),
       
        
        
      }
    }

    static api(){
      //return apiVariantOption;
    }
  }

