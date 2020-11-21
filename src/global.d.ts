import lodash from 'lodash'
import {api} from '@/api/types'

//for help https://www.typescriptlang.org/docs/handbook/declaration-merging.html
export declare global {
    interface Window {
      // add you custom properties and methods
      _:typeof lodash
     

    }

  


    interface localAuthInfo {
      displayName:string | null;
email:string | null;
phoneNumber: string | null;
photoURL: string | null;
providerId: any;
uid: "saif@gmail.com"
emailVerified?:boolean,
    }

     interface cropedImage {
      type: string;
      size: number;
      name: string;
      webkitRelativePath: string;
      lastModifiedDate: string;
      lastModified: number;
      dataUrl ? : string | undefined;
  }

    interface profile {
        $id?:any, // for ormn,
        userId:any,
        name:string,
        title:string,
        bloodGroup:string,
        editor?:boolean,
        thumb:string,
        active?:boolean
  }
  interface profileInterface {
    $id?:any, // for ormn,
    userId:string,
    name:string,
    title:string,
    bloodGroup:string,
    editor?:boolean,
    active?:boolean
    thumb:string
}
  interface post {
    $id?:any, // for ormn
        content: string,
      
        userId:string,
        by:profile,
        createdOn:number,
        likes:number,
        comments:number,
        shares:number
        
}

interface comment {
    $id?:any, // for ormn
        content: string,
        createdOn:number,
        userId:string,
        postId:string,
        likes:number,
        replyes:number
        by:profile,
       
      
        
}

interface like {
   
        userId:string,
        postId:string,
       
      
        
}



  
  }