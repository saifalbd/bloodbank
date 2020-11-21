<template>
<div>
    <!-- Styled -->
    <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

    <b-button @click="add"> add </b-button>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

import {
    BFormFile,
    BButton
} from "bootstrap-vue";

import {
   ref
} from '../firebase'

export default Vue.extend({
    components: {
        BFormFile,
        BButton
    },
    data() {
        return {

            file: null,
          
        }
    },
    methods:{
        add(){
            if (this.file) {

               var file = this.file;

            var mountainImagesRef = ref.child('images/cc.txt');
var message = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
mountainImagesRef.putString(message, 'data_url').then(function(snapshot) {
    console.log(snapshot);
    
  console.log('Uploaded a blob or file!');
});
                
            }else {
                alert('file not add')
            }
           
        }
    }

})
</script>

<style scoped>

</style>
