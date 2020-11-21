
import { auth, usersCollection, imageCollection } from '@/firebase';
import { Model } from '@vuex-orm/core'
import { api} from '@/api/types'

import uploadFile from './uploadFile'
import { isFunction, first } from 'lodash';
import { Picture } from '@/models';
import { LocalAuth } from '@/plugins/LocalAuth';

interface createCallBack {
    onProgress?: Function;
    onError?: Function;
    onSuccess?: Function;
}

export default class Image extends uploadFile {

    public table: firebase.firestore.CollectionReference;
    public _sendImage:undefined | api.request.image;
    public _callBack: createCallBack | undefined;
    public _snapshot:undefined | firebase.storage.UploadTaskSnapshot;
    public file: any;
    public modelType:string;
  


    constructor(modelType:string) {
        super()
        this.modelType = modelType;
        this.table = imageCollection;

        

    }

    //calback function
    uploadOnProgress(snapshot: firebase.storage.UploadTaskSnapshot): void {

        this._snapshot = snapshot;
        if (isFunction(this._callBack?.onProgress)) {
            this._callBack?.onProgress(snapshot)
        }

    }
    //calback function
    uploadOnError(error: Error): void {

        if (isFunction(this._callBack?.onError)) {
            this._callBack?.onError(error)
        }

    }
    //calback function
    async uploadOnFinisd() {

        if (!this._snapshot) { return false }

        await this._snapshot.ref.getDownloadURL()

       let res = await this.createImage()
        if (isFunction(this._callBack?.onSuccess)) {
            this._callBack?.onSuccess(res)
        }

    }

    defaultQurey(modelId:any):firebase.firestore.Query{
        return imageCollection
        .where('modelId', '==', modelId).where('modelType', '==', this.modelType);

    }

    async createImage() {

        

        try {
            if (!this._snapshot) { throw '_snapshot are missing'  }

            let path = this._snapshot.ref.fullPath
            if (!path) { throw 'path not found' }

            

            if (this._sendImage) {
             let res =  await imageCollection.add({ ...this._sendImage, path });
             return res;
            }
        } catch (error) {
            console.error(error)
        }

    }

    async update(
        image: api.request.cropImg, 
        old:{id:string,path:string},
        callback: undefined | createCallBack) {
        this._callBack = callback;

        let x = {
            type: image.info.type,
            size: image.info.size,
            name: image.info.name,
            lastModified: image.info.lastModified,
            userId: image.userId,
            createdOn: Date.now(),
            modelType:this.modelType,
            modelId:image.modelId,
            fileType:image.fileType,
        }

        this._sendImage = x;

        try {
            console.log(image);
            
            if (!image.dataUrl) { throw 'image.dataUrl missing'}
            if (!old.id) { throw 'imageId missing'}
            if (old.id ===undefined) { throw `image id are missing set image id only for update image`}
            if (old.path ===undefined) { throw `image path are missing set image id only for update image`}

         
                
              
              
                await this.delete(old)

                this.imageType('base64').put(image.dataUrl)
            

        } catch (e) {
            console.error(e);
            
            return e;

        }
    }

    create(image: api.request.cropImg, callback: undefined | createCallBack) {

        this._callBack = callback;

        let x = {
            type: image.info.type,
            size: image.info.size,
            name: image.info.name,
            lastModified: image.info.lastModified,
            userId: image.userId,
            createdOn: Date.now(),
            modelType:this.modelType,
            modelId:image.modelId,
            fileType:image.fileType,
        }

        this._sendImage = x;

        try {

            if (image.dataUrl) {
                console.log('file has');

                this.imageType('base64').put(image.dataUrl)
            }

        } catch (e) {
            return e;

        }

    }

    async  show(modelId:string):Promise<api.response.image |null | Error>{

        console.log({modelId});
        

        const res  = await this.defaultQurey(modelId)
        .limit(1).get();
        
        

        if (!res.docs.length) {
            return null;
        }
       
          try {
            let img = first(res.docs.map((i:firebase.firestore.DocumentData)=>{
                let data =  i.data()
                 data.id = i.id;
                 return data;
             })) as any;
             if (img !=undefined) {
                 let url = await this.getFullUrl(img.path)
                 img.url = url;
             }
 
             return img;
          } catch (error) {
              console.error(error);
              
              return error;
          }
            

        }

  async  delete(image: {id:string,path:string}) {

    try {
    
        await  this.table.doc(image.id).delete()
     await super.deleteFile(image.path)
     return true;
    } catch (error) {
        console.error(error);
        return error;
        
    }
      
    }

}