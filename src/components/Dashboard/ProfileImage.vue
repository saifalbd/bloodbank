<template>
<b-overlay
    :show="busy"
    rounded="sm">
    <div
        class="imgBox"
        :class="{hoverAble:isHoverable}">
        <b-img
            class="thumImg"
            :src="$root.thumb(image.dataUrl?image.dataUrl:url)"
            fluid
            thumbnail></b-img>
        <div class="addImgBox">
            <input type="file" v-on:change="inputFile">
            <b-button> Change Profile </b-button>
        </div>

        <input type="file" v-on:change="inputFile">

    </div>
    <vue-crop
        v-model="dialog"
        :src="image.dataUrl"
        @done="cropedImage"
        @cancel="cropCancel"></vue-crop>

          <template #overlay>
        <div class="text-center">
        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        <p id="cancel-label">{{progress}}%</p>
          <p id="cancel-label">{{progressTatus}}</p>
          
        </div>
      </template>
    
</b-overlay>
</template>

<script lang="ts">


import {
    BButton,
    BOverlay,
    BImg,
    BSpinner

} from "bootstrap-vue";
import VueCrop from '../vueCrop.vue';
import {
    Profile
} from '@/models';

import uploadFile from '@/api/Image/Index'

import {
    imageCreate
} from '@/api/types'
import {
  capitalize,
    isObjectLike, upperCase
} from 'lodash';
import {
    LocalAuth
} from '@/plugins/LocalAuth';
import {
    ReadFile
} from '@/plugins/ReadFile';
import {
    
    auth
} from '@/firebase'

import { api} from '@/api/types'
import Vue,{PropType} from 'vue'

import ProfileImg from './internal/ProfileImg'

export default Vue.extend({
    components: {
        BButton,
        VueCrop,
        BImg,
        BOverlay,
         BSpinner

    },
    props: {
        profile: {
            type: Object as PropType < api.response.profile > ,
            default(){
                return {}
            }
        }
    },
    data() {
        return {
            dialog: false,
            image: {
                info: {
                    type: '',
                    size: 0,
                    name: '',
                    lastModified: 0,
                },
                dataUrl: '',
                userId: '',
                fileType:'image',
            },
            file: null,
            isHoverable: true,
            busy: false,
            progress:0,
            progressTatus:'Please wait...'

        }
    },
    
    methods: {
        ...ProfileImg,
         addurl(){
            let p = (this as any).profile;
            if (p.thumb) {
                return p.thumb.url;
            }
            return null
        },
        close(index: any) {
            //this.images.splice(index, 1);
        },
       
       
     
        cropedImage($event:api.request.cropImg) {

            this.$data.image.dataUrl = $event;
            this.$data.isHoverable = false;
             (this as any).upload()

        },
        cropCancel() {
            this.$data.image.dataUrl = 22;
            this.$data.isHoverable = true
        }
    },
   created(){
      (this as any).url =  (this as any).addurl()
     
       
    //    let x = await Profile.imageApi().show(LocalAuth.id())
    //     console.log(x);
        
    }

})
</script>

<style lang="scss" scoped>
.imgBox {
    position: relative;
    overflow: hidden;

    .thumImg {
        position: relative;
    }

    .addImgBox {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: none;
        justify-content: center;
        align-items: center;

        transform: translateY(100%);
        background-color: rgba(0, 0, 0, 0.288);

    }

    input[type="file"] {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
    }

    &.hoverAble {
        .addImgBox {
            display: flex;
        }

        &:hover {
            .addImgBox {
                transform: translateY(0%);
            }
        }
    }

}
</style>
