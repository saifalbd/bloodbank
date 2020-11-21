import { Model } from '@vuex-orm/core'
import { ApiPost  } from '../api';
import ImageUpload from '../api/Image/Index';



export default class Post extends Model {
    static entity = 'posts'
  
    static fields () {
      return {
        id: this.attr(null),
        content: this.attr(null),
        createdOn:this.attr(null),
        userId:this.attr(false),
        by:this.attr(null),
        likes:this.number(0),
        comments:this.number(0)
        
       
        
      }
    }

    static api(){
      return new ApiPost(Post);
    }

    static imageApi(){

      return new ImageUpload(this.entity);
  }
  }

