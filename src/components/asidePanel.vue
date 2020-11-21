<template>
<div>
    <b-card no-body>
        <!-- <b-card-img
            src="https://placekitten.com/480/210"
            alt="Image"
            top></b-card-img> -->
        <profile-image 
        :profile="profile"
        ></profile-image>

        <!-- <template #header>
            <h4 class="mb-0">Hello World</h4>
        </template> -->
        <b-card-header>
            <b-card-title class="p-1 m-0">
               {{ profile.name}}
            </b-card-title>
        </b-card-header>

        <b-card-body>

            <b-card-sub-title class="mb-2 mb-0">
                 {{ profile.title}}
            </b-card-sub-title>
            <b-card-text>
                apnar sommondde kisu likun
            </b-card-text>
        </b-card-body>

        <b-list-group flush>
             <b-list-group-item class="d-flex justify-content-between align-items-center">
                BloodGroup
                <b-badge
                    variant="primary"
                    pill>{{profile.bloodGroup}}</b-badge>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
                Total Post
                <b-badge
                    variant="primary"
                    pill>14</b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
                Total Donate
                <b-badge
                    variant="primary"
                    pill>2</b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
                Total Commnents
                <b-badge
                    variant="primary"
                    pill>1</b-badge>
            </b-list-group-item>
        </b-list-group>

        <b-card-body>
            <a href="#" class="card-link">Settings</a>

        </b-card-body>

        <b-card-footer>This is a footer</b-card-footer>

    </b-card>
    <!-- <vue-crop/> -->
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
    BButton,
    BSidebar,
    
    BListGroup,
    BListGroupItem,
    BBadge,
    BCardFooter,
    BCard,
    BCardText,
    BCardImg,
    BCardTitle,
    BCardBody,
    BCardSubTitle,
    BCardHeader
} from "bootstrap-vue";

import ProfileImage from './Dashboard/ProfileImage.vue';
import { LocalAuth } from '@/plugins/LocalAuth';
import { api } from "@/api/types";
import { forIn } from 'lodash';


export default Vue.extend({
    components: {
        
        BBadge,
        BListGroup,
        BListGroupItem,
        BCardHeader,
        BCardFooter,
        BCard,
        BCardText,
        
        BCardTitle,
        BCardBody,
        BCardSubTitle,
        // VueCrop,,
        ProfileImage
       
    },
    data(){
        return {
            thumb:{},
            profile:{
                name:'',
                title:'',

            }
        }
    },
    methods:{
        fetchProfile():null | api.response.profile{

            return LocalAuth.profile();

        }
    },
    created(){
        let profile =  this.fetchProfile();
        if (profile) {

            if (profile.thumb) {this.thumb = profile.thumb;}
          
          this.profile = profile;
           

            
        }else {
            LocalAuth.logOut()
        }

    }
    // computed:{
    //     profile(){
    //         return this.$store.state.userProfile
    //     }
    // }
})
</script>

<style lang="scss" scoped>

</style>
