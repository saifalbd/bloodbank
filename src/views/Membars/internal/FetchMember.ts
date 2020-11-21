import { api, modelType } from '@/api/types';
import { Picture, Profile } from '@/models';
import { isError } from 'lodash';

export class FetchMember{

 private   hasOnLocal():Array<api.model.profile |any>{
     let p =   Profile.all() 
     console.log({p});
     return p;
     
    }

  private  hasOnLocalImg(modelId:string,modelType:modelType):any{

     return   Picture.query().where('modelId',modelId).where('modelType',modelType).first()

    }



  async  getImage(user:api.model.profile){
        let hasImage = this.hasOnLocalImg(user.id,'profile');
        
        
        if (hasImage) {
            console.log(`${user.name} image from local`);
            
            return hasImage;
        }else {
          let data = await  Profile.imageApi().show(user.id);
          if (data) {
            console.log(`${user.name} image from server`);
              Picture.insert({data})
              
          }else{
            console.log(`${user.name} image not found on server`);
          }
         
          return data;

        }

    }




  async  userCollection(){
        
        let hasLocal = this.hasOnLocal();
       
        if (Profile.query().count()) {
            return hasLocal;
        }else {
            console.log('profile collection from server');
            
            let data = await Profile.api().collection();
            
            Profile.create({data })

            return data;
        }
    }




}