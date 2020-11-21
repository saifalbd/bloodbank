import { commentsCollection } from '@/firebase';
import { Model } from '@vuex-orm/core'
import { ApiComment } from '../api';


export default class Comment extends Model {
    static entity = 'coments'
  
    static fields () {
      return {
        id: this.attr(null),
        content: this.attr(null),
        createdOn:this.attr(null),
        userId:this.attr(false),
        postId:this.attr(false),
        likes:this.number(0),
        replyes:this.number(0),
        by:this.attr(null),
        
        
      }
    }

    static api(){
      return  new ApiComment(Comment );
    }
  }

