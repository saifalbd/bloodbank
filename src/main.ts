import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import './assets/scss/app.scss'

import './plugins/validate';


import './assets/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.min.css';
import { LocalAuth } from './plugins/LocalAuth'
import { api } from './api/types'




// import { Profile } from "./models/Profile";

// Profile.api().collection();


// (window as Window)._  =lodash;

Vue.config.productionTip = false



let app:any

    app = new Vue({
      router,
      store,
      render: h => h(App),
      data(){
        return {
          user:null
        }
      },
      computed:{
        profile():null | api.response.profile{
          let p  = LocalAuth.profile();
          return p;
        }
      
      },
      methods:{
        vs(valid:any,errors:any){
            return errors[0] ? false : (valid ? true : null)
        },
        thumb(src:string = ''){
          if (src) {
            return src;
            
          }else{
            return './thumb.webp';
          }

        },

      

    },
    
    }).$mount('#app')
  

  // if (user) {
  //   store.dispatch('fetchUserProfile', user)
  // }
  // auth.onAuthStateChanged(user => {})
