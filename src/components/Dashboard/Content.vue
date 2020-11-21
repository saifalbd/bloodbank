<template>
<div class="pt-4">
    <post-create></post-create>
    <div class="mt-5">
        <post-collection></post-collection>
    </div>
</div>
</template>

<script>
import PostCreate from './PostCreate.vue';
import PostCollection from './PostCollection'
import {
    Post
} from '@/models';

export default {
    components: {

        PostCreate,
        PostCollection
    },
    created() {

        Post.api().collection()
    }

}
</script>

<style lang="scss" scoped>

</style>
