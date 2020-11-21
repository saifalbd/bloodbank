<template>
  <div id="app">

   
    <SiteNav v-if="showNav"></SiteNav>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SiteNav from '@/components/SiteNav'
import { LocalAuth } from './plugins/LocalAuth'

export default {
  components: {
    SiteNav
  },
  computed: {
    
    showNav() {
     
      return LocalAuth.profile()
    }
  }
}
</script>
