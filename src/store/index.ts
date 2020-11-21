import Vue from 'vue'

import Vuex from 'vuex'
import {auth,usersCollection,postsCollection,commentsCollection,likesCollection}  from '../firebase'

import router from '../router/index'

import VuexORM from '@vuex-orm/core'
import {Profile,Post,Comment,Picture} from '@/models';
import { LocalAuth } from '@/plugins/LocalAuth'
import { hasIn } from 'lodash'

import VuexPersistence from 'vuex-persist'
import { ApiProfile } from '@/api'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

// Create a new instance of Database.
const database = new VuexORM.Database();



// Register Models to Database.
database.register(Profile)
database.register(Post)
database.register(Comment)
database.register(Picture)




const store = new Vuex.Store({
  plugins: [VuexORM.install(database),vuexLocal.plugin],
  state: {
    userProfile: {},
    posts: [],
    users:[],
  },
  mutations: {
   
  },
  actions: {
    async login({ dispatch }, form) {
      try {
        const { user } = await auth.signInWithEmailAndPassword(form.email, form.password)
        if (user) {
          const userProfile = await usersCollection.doc(user.uid).get();

          if (!userProfile) {
            return false;
          }
          var data:any = {
            id:userProfile.id,
            userId:user.uid,
            ...userProfile.data()
          }
           
          
          LocalAuth.attempt(user)
  
          if (LocalAuth.check() && data) {
            //profile': id, userId, name, title, bloodGroup
  
                        LocalAuth.setProfile(data)
                   
            
        
            router.push({name:'Dashboard'})
            
          }
        }
      
     
      } catch (error) {

        console.error(error);
        return error;
        
        
      }
      // sign user in
      

      
    
     
      // dispatch('fetchUserProfile', user)
    },
    async signup({ commit }, form) {
      // sign user up
    let {user} = await auth.createUserWithEmailAndPassword(form.email, form.password)

    if (user) {
      let data  = {
        userId:user.uid,
        name:form.name,
        title:form.title,
        bloodGroup:'',
        totalPost:0,
        totalDonate:0,
        totalComment:0,


      }
    await  Profile.api().create(user,data);

    }


     location.reload();


      
    },
  
    
    
  }
})

export default store