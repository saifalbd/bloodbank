import { isFunction } from 'lodash';


export class ReadFile {

    public file:File;

    constructor(file:File){
        this.file = file;
    }


    public info(){
       const {
            type,
            size,
            name,
            lastModified
        } = this.file;

        return {
            type,
            size,
            name,
            lastModified
        }
    }

    read(callBack:Function){

        var reader:FileReader = new FileReader();
        reader.onload = ()=> {
          
            if (isFunction(callBack)) {
                callBack(this.info(),reader.result)   
            }  

        };
        reader.readAsDataURL(this.file);

    }



}