export interface imageCreate {
  type: string;
  size: number;
  name: string;
  modelId:string,
  modelType:string,
  userId:string,
  lastModified: number;
  createdOn:number
  
}

export interface cropImg {
 info:{
  type: string;
  size: number;
  name: string;
  lastModified: number;
 }
  userId:string,
  modelId:string,
  dataUrl:string
  
}

type imageORVideo = "image" | "video";
type modelType =  "profile" | "post" | "gallery";



export declare namespace apiSend {
    export interface image {
        type: string;
        size: number;
        name: string;
        userId:string,
        postId?:string,
        galleryId?:string,
        webkitRelativePath: string;
        lastModifiedDate: string;
        lastModified: number;
        dataUrl:string,
        path:string
      }
    }


    export declare namespace apiReciev {
        export interface image  extends apiSend.image {
            id: string;
            url:string,
            path:string
          }
    }
    export declare namespace model {
        export interface image extends apiReciev.image {
            $id: string;
          }
    }




    export declare namespace api {
      export declare namespace request {


      
        
     

        export interface imageInfo {
          type: string;
         size: number;
         name: string;
         lastModified: number;
        }
     
      export interface cropImg {
        info:imageInfo
         userId:string;
         modelId:string;
         dataUrl:string;
         fileType:string;//image or video
         prototype?:any;

         id?: string; // need only for update image
         path?:string; // need only for update image

       }

       export interface image {
        type: string;
        size: number;
        name: string;
        modelId:string;
        modelType:string;
        userId:string;
        lastModified: number;
        fileType:string; //image or video
        createdOn:number;
        
      }


      export   interface profile {
        userId:string,
        name:string,
        title:string,
        bloodGroup:string,
        editor?:boolean,
        active?:boolean
        thumbId?:string
    }
      

       
      }  
      export declare namespace response {
        
        export interface image extends request.image {
          id: string;
          url:string;
          path:string;
        }

        
      export   interface profile extends request.profile {
        id: string;
        userId:string;
        name:string;
        title:string;
        bloodGroup:string;
        editor?:boolean;
        active?:boolean;
        thumbId?:string;
        thumb?:response.image;
        totalPost?:number;
        totalDonate?:number;
        totalComment?:number;

    }
      

     
      }  
      
    export declare namespace model {
     
        
      export interface image {
        $id:string,
        id: string;
        type: string;
        size: number;
        name: string;
        modelId:string,
        modelType:string,
        userId:string,
        lastModified: number;
        createdOn:number,
        fileType:'image'|'video'
        url:string,
        path:string
      }

      export   interface profile extends request.profile {
        $id:string,
        id: string;
        userId:string,
        name:string,
        title:string,
        bloodGroup:string,
        editor?:boolean,
        active?:boolean
        thumbId?:string
        thumb?:request.image,
        prototype?:any;
    }

   
  
  } 
    }  

   