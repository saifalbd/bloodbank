<template>
<b-card>
    <b-media>
        <template #aside>
            <b-img
                blank
                blank-color="#ccc"
                width="64"
                alt="placeholder"></b-img>
        </template>

        <b-container class="d-flex align-items-center justify-content-between infoPanel">
            <div class="d-flex align-items-center">
                <div class="h5">
                    {{user.name}}

                </div>
                <small class="pl-1 pr-1">
                    >>
                </small>
                <b-card-sub-title>({{user.title}})</b-card-sub-title>
            </div>
            <small>
                {{post.createdOn | timeAgo}}
            </small>

        </b-container>

        <p>
            {{post.content}}
        </p>

        <b-container class="infoPanel mb-2">
            <b-button-group
                size="sm"
                class="w-100">
                <b-button
                    class="d-flex justify-content-around align-items-center"
                    variant="outline-primary"
                    @click="doLike(post.likes)"
                    :disabled="busyLike">
                    <b-icon-hand-thumbs-down v-if="authHasLike"></b-icon-hand-thumbs-down>
                    <b-icon-hand-thumbs-up v-else></b-icon-hand-thumbs-up>

                    <span class="ml-2 d-none d-sm-flex">
                        {{authHasLike?'like Reverce':'like'}}

                    </span>
                    <b-badge
                        class="ml-2"
                        variant="dark">{{post.likes}}</b-badge>
                </b-button>
                <b-button
                    class="d-flex justify-content-around align-items-center"
                    variant="outline-primary"
                    @click="openComment">
                    <b-icon-command></b-icon-command>
                    <span class="ml-2 d-none d-sm-flex">
                        comments
                    </span>
                    <b-badge
                        class="ml-2"
                        variant="dark">{{post.comments}}</b-badge>
                </b-button>
                <b-button
                    class="d-flex justify-content-around align-items-center"
                    variant="outline-primary">
                    <b-icon-share-fill></b-icon-share-fill>
                    <span class="ml-2 d-none d-sm-flex">
                        Share
                    </span>
                    <b-badge
                        class="ml-2"
                        variant="dark">4</b-badge>
                </b-button>
            </b-button-group>

        </b-container>
        <!-- comment media tart hear -->
        <b-list-group>
            <comment-item
                v-for="(comment ,index) in comments"
                :key="index"
                :comment="comment">

            </comment-item>
        </b-list-group>

        <slot></slot>
        <!-- comment media end hear -->
    </b-media>
    <b-card-footer class="p-0 mt-2">
        <do-comment
            :show="showComment"
            comment-type="comment"
            :post="post"></do-comment>
    </b-card-footer>
</b-card>
</template>

<script lang="ts">
import {
    BImg,
    BMedia,
    BCard,
    BListGroup,
    BListGroupItem,
    BButtonGroup,
    BButton,
    BIconHandThumbsUp,
    BIconHandThumbsDown,
    BIconCommand,
    BIconShareFill,
    BBadge,
    BContainer,
    BCardSubTitle,
    BCardFooter,

    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BIconArrowClockwise

} from "bootstrap-vue";

import DoComment from './DoComment.vue';
import CommentItem from './CommentItem.vue'

import moment from 'moment'

import Vue, {
    PropType
} from 'vue'
import {
    Post,
    Comment,Profile
} from '@/models';
import { keys } from 'lodash';
import { use } from '@vuex-orm/core';

export default Vue.extend({
    props: {
        post: {
            type: Object as PropType < post > ,
            required: true,

        }

    },
    components: {
        DoComment,
        BCardSubTitle,
        BImg,
        BMedia,
        BCard,
        BIconHandThumbsUp,
        BIconHandThumbsDown,
        BButtonGroup,
        BButton,
        BIconCommand,
        BIconShareFill,
        BBadge,
        BContainer,
        BCardFooter,
        BListGroup,
        CommentItem

    },
    data() {
        return {
            submitLoding: true,
            commentContent: '',
            showComment: false,
            authHasLike: false,
            busyLike: false,
            user:{
                name:'',
                title:''
            },

            userName:'',

        }
    },

    methods: {
        api() {
            return Post.api()
        },

        async doLike() {
            if (!this.$data.busyLike) {

                if (this.$data.authHasLike) {
                    this.$data.busyLike = true;

                    await Post.api().likeDown(this.post);
                    this.$data.authHasLike = false;
                    this.$data.busyLike = false;
                } else {
                    this.$data.busyLike = true;
                    await Post.api().likeUp(this.post);
                    this.$data.authHasLike = true;
                    this.$data.busyLike = false;
                }

            }

        },
        openComment() {
            if (!this.$data.showComment) {
                Comment.api().collectionByPost(this.post)
                this.$data.showComment = true;

            }

        }
    },
    computed: {
        comments() {
            return Comment.query().where('postId', this.post.$id).get();
        }

    },
    async created() {

    

        try {

          (this as any).user  = await  Profile.api().withThumb()
          .show(this.post.userId);
         
          
            
        } catch (error) {
            console.log(error);
            
        }

            this.$data.authHasLike = await Post.api().hasLIke(this.post);
    

    },
    watch:{
      
    },

    filters: {

        timeAgo(val: number) {

            return moment(val).fromNow(true)

        },

    },

});
</script>

<style lang="scss" scoped>
.infoPanel {
    border-top: 1px dotted silver;
    border-bottom: 1px dotted silver;
}
</style>
