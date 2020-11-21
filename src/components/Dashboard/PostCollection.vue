<template>
<div>

   
    <post-item
        v-for="(post ,index ) in posts"
        :key="index"
        :post="post"></post-item>

</div>
</template>

<script>
import PostItem from './PostItem'


import moment from 'moment'
import {
    Post,
    Comment
} from '@/models';
export default {
    components: {
        
        PostItem

    },
    data() {
        return {
            submitLoding: true,
            commentContent: '',
            show: true
        }
    },
    computed: {
        posts() {
            return Post.query().orderBy('createdOn', 'desc').get()
        },

    },
    methods: {
        openComment() {

        }
    },
    filters: {

        timeAgo(val) {

            return moment(val).fromNow(true)

        },
        formatDate(val) {
            if (!val) {
                return '-'
            }

            let date = val.toDate()
            return moment(date).fromNow()
        },
        trimLength(val) {
            if (val.length < 200) {
                return val
            }
            return `${val.substring(0, 200)}...`
        }
    },
    created() {

    }

}
</script>

<style lang="scss" scoped>
.infoPanel {
    border-top: 1px dotted silver;
    border-bottom: 1px dotted silver;
}
</style>
