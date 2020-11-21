import { Model } from '@vuex-orm/core'
import { ApiProfile } from '../api';
import ImageUpload from '../api/Image/Index';



export default class Picture extends Model {
    static entity = 'picture'
    id?: string;
    type?: string;
    size?: number;
    name?: string;
    modelId?:string;
    modelType?:string;
    userId?:string;
    lastModified?: number;
    createdOn?:number;
    fileType?:'image'|'video';
    url?:string;
    path?:string;
  
    static fields () {
      return {
      
        id: this.string(''),
        type: this.attr(null),
        size: this.number(0),
        name: this.string(''),
        modelId:this.string(''),
        modelType:this.string(''),
        userId:this.string(''),
        lastModified: this.number(0),
        createdOn: this.number(0),
        url:this.string(''),
        path:this.string('')
      }
    }

    static api(){

        return new ApiProfile(this);
    }

    static imageApi(){

      return new ImageUpload(this.entity);
  }
  }