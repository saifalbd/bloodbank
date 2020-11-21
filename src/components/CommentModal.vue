<template>
<div class="c-modal">
    <div class="c-container">
        <a @click="$emit('close')">close</a>
        <p>add a comment</p>
        <form @submit.prevent>
            <textarea v-model.trim="comment"></textarea>
            <button @click="addComment()" :disabled="comment == ''" class="button">add comment</button>
        </form>
    </div>
</div>
</template>

<script lang="ts">
import {
    commentsCollection,
    postsCollection,
    auth
} from '@/firebase'

import Vue, {
    PropType
} from 'vue'
export default Vue.extend({
    props: {
        post: {
            type: Object as PropType < post > ,
            required: true,
        }
    },
    data() {
        return {
            comment: ''
        }
    },
    methods: {
        async addComment() {
          alert(252)

          let a:any =  auth.currentUser;
            // create comment
            await commentsCollection.add({
                createdOn: new Date(),
                content: this.comment,
                postId: this.post.$id,
                userId: a.uid,
                userName: this.$store.state.userProfile.name
            })

            // update comment count on post
            await postsCollection.doc(this.post.$id).update({
                comments: this.post.comments + 1
            })

            // close modal
            this.$emit('close')
        }
    }
})
</script>
