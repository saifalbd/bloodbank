import { padEnd, toString,has, hasIn } from 'lodash';


import {
    ref,firebase
 } from '@/firebase'
import { Unsubscribe } from 'firebase';
 

type imageType = "base64" | "file";
// type progress = ""

interface metaData {
    contentType: string
}

export default abstract class uploadFile {

    public _imageType: imageType;
    private _fileName:string;
    private _extension:string |null;

    private _basePath:string;
    public _metaData:metaData|undefined;


    constructor(){

        this._imageType = 'base64'
        this._fileName =  toString(Date.now())
        this._extension = null;
        this._basePath = 'images';
        this._metaData = undefined;
        
       


    }


    

    private nameWithExt(){
        let ex = this._extension ? `.${this._extension}`:'';
        return `${this._fileName}${ex}`
    }

    private path(){
        let name = this.nameWithExt();
        let basePath = this._basePath;
        return `${basePath}/${name}`;
    }


    private ref(){
        return ref.child(this.path());
    }

    abstract  uploadOnProgress(snapshot:firebase.storage.UploadTaskSnapshot):void
    abstract uploadOnError(error:Error):void
    abstract uploadOnFinisd():any
    
    private  isfile(file:File){
        var imageRef = this.ref();
          let res =  imageRef.put(file);
    this.uploadTask(res)
    return res;
    }


    private uploadTask(task:firebase.storage.UploadTask){
        let self = this;
        task.on('state_changed',

        (snapshot:firebase.storage.UploadTaskSnapshot)=>self.uploadOnProgress.apply(self,[snapshot]),
        (error:Error)=>self.uploadOnError.apply(self,[error]),
        ()=>self.uploadOnFinisd.call(self)
        )

    }

   private  isBase64(file:string){
    var imageRef = this.ref();


 try {
    let res =   imageRef.putString(file, 'data_url',this._metaData);
    this.uploadTask(res)

    return res;
     
 } catch (error) {
     console.error(error)
     
 }
  
 // this.uploadTask(res.task)
  
  
  
    }

   put(file:File|string){
  
    if (this._imageType=='file') {
        let fileIs:File = file as File;
        this.isfile(fileIs)
       
    }else {
   
        
        let fileIs:string = file as string;
       this.isBase64(fileIs)
    }
   
    }

   async getFullUrl(path:string){
  return await  firebase.storage().ref(path).getDownloadURL()
    
    }

    async deleteFile(path:string){
        return await  firebase.storage().ref(path).delete()
          
          }

    metaData(meta:metaData): this{
        this._metaData = meta;
        return this;
    }

    imageType(imageType: imageType): this{
        this._imageType = imageType;
        return this;
    }

    
    fileName(name:string): this{
        this._fileName = name;
        return this;
    }

    extension(name:string): this{
        this._extension = name;
        return this;
    }

    

    

}