import {
    ReadFile
} from '@/plugins/ReadFile';
import {
    LocalAuth
} from '@/plugins/LocalAuth';
import { api } from '@/api/types';

import { Profile } from '@/models';

import {
    firebase,
    auth
} from '@/firebase'
import { capitalize, cloneDeep, isError, isUndefined } from 'lodash';

export default {

    async showImage() {

        try {

            let image = await Profile.imageApi().show((this as any).profile.id);
            if (image != undefined && image != null && !isError(image)) {
                let profile = cloneDeep(LocalAuth.profile());
                if (profile != null) {
                    profile.thumb = image;

                
                    (this as any).url = image.url
                 

                   LocalAuth.setThum(image)
                   
                    LocalAuth.setProfile(profile)
                }else {
                    alert('profile is null')
                }

            }

        } catch (error) {
            return error;
        }

    },

    onError() {

    },

    onProgress(snapshot: firebase.storage.UploadTaskSnapshot) {

        var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        (this as any).progress = Math.ceil(progress);

        switch (snapshot.state) {
            case firebase.storage.TaskState.RUNNING:
                (this as any).progressTatus = capitalize('upload is running');
                console.log((this as any).$data.progressTatus);

                break;
            case firebase.storage.TaskState.PAUSED:

                (this as any).progressTatus = capitalize('Upload is paused');
                console.log((this as any).$data.progressTatus);
                break;

            case firebase.storage.TaskState.CANCELED:

                (this as any).progressTatus = capitalize('Upload is CANCELED');
                console.log((this as any).$data.progressTatus);
                break;
        }

    },
    async onSuccess(res: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>) {
        await this.showImage();

        (this as any).busy = false;
        this.afterUpload()
    },
    readFile(file: File) {
        (new ReadFile(file)).read((info: api.request.imageInfo, src: string) => {
            let vue = (this as any).$data;

            vue.image = {
                dataUrl: src,
                userId: LocalAuth.id(),
                info
            }

            vue.isHoverable = false;
            vue.dialog = true;

        })

    },
    inputFile($event: any) {

        var input = $event.target;
        const file = input.files[0];

        if (input && input.files && file) {
            this.readFile(file)

        }
        // console.log(input.files[0])
    },
    beforeUpload() {
        (this as any).$data.dialog = false;
        (this as any).$data.busy = true;

    },
    afterUpload() {
      
        (this as any).$data.busy = false;

    },

  async  upload() {

        this.beforeUpload()
        if (!LocalAuth.check()) {
           await LocalAuth.logOut()
        }

        let image = (this as any).image;
        image.userId = LocalAuth.id();
        image.modelId = (this as any).profile.id;
        image.fileType = 'image';

        try {
            if (!image.fileType) {
                throw 'image file Type are misssing'
                return false
            }
            if (!image.dataUrl) {
                throw 'image dataUrl are misssing'
                return false
            }
            if (!image.userId) {
                throw 'image user id are misssing'
                return false
            }

           

            //this.image.userId
            let u = Profile.imageApi()

            if (!image.modelId) {
                throw 'image modelId missing model is is image parent id'
            }

            let back = {
                onProgress: (this as any).onProgress,
                onError: (this as any).onError,
                onSuccess: (this as any).onSuccess

            }


            let t = LocalAuth.getThum()

            let thumb =t && Object.keys(t).length;

            if (thumb) {
                const {id,path} = t;
                
             
               
                if (id == undefined) { throw 'model picture are not found' }
                if (path == undefined) { throw 'model picture are not found' }
              
                
                u.update(image,{id,path},back )
            }else {
                
                u.create(image,back )
            }

            

        } catch (error) {
            console.error(error);
            return false;

        }

       

        //https://www.geeksforgeeks.org/firebase-to-get-url/

    }

}