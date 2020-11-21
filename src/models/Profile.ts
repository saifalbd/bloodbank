import { Model } from '@vuex-orm/core'
import { ApiProfile } from '../api';
import ImageUpload from '../api/Image/Index';



export  class Profile extends Model {
    static entity = 'profile'
  
    static fields () {
      return {
        id: this.attr(null),
        name: this.attr(null),
        title: this.attr(null),
        bloodGroup:this.attr(null),
        editor:this.boolean(false),
        thumb:this.attr(null)
       
        
      }
    }

    static api(){

        return new ApiProfile(Profile);
    }

    static imageApi(){

      return new ImageUpload(this.entity);
  }


  }