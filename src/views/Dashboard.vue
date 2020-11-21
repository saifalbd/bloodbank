<template>
<div id="dashboard">
    <transition name="fade">
        <CommentModal
            v-if="showCommentModal"
            :post="selectedPost"
            @close="toggleCommentModal()"></CommentModal>
    </transition>

    <div
        class="mainRow"
        :class="`${sideBarShow?'with-side-bar':'without-side-bar'}`">
        <div class="sideBar">
            <div
                class="menu-fade"
                @click="sideBarShow = ! sideBarShow">
                <BIconArrowBarRight
                    :scale="1.5"
                    :rotate="`${sideBarShow?'180deg':'0deg'}`" />
            </div>
            <div class="sideBarContent">
                <aside-panel></aside-panel>
            </div>

        </div>

        <div class="main">

            <b-container >

        

                <DashboardContent />
            </b-container>

        </div>
    </div>

</div>
</template>

<script>
import {
    commentsCollection
} from '@/firebase'
import {
    mapState
} from 'vuex'

import CommentModal from '@/components/CommentModal'
import AsidePanel from '@/components/asidePanel'
import {
    BContainer,
    BIconArrowBarRight
    // BRow,
    // BCol
} from "bootstrap-vue";

import moment from 'moment'

import DashboardContent from '../components/Dashboard/Content'
import {
    LocalAuth
} from '@/plugins/LocalAuth'

export default {
    components: {
        DashboardContent,
        AsidePanel,
        CommentModal,
        BContainer,
        BIconArrowBarRight

    },
    data() {
        return {
            post: {
                content: ''
            },
            showCommentModal: false,
            selectedPost: {},
            showPostModal: false,
            fullPost: {},
            postComments: [],
            sideBarShow: true
        }
    },
    computed: {
        ...mapState(['userProfile', 'posts'])
    },
    methods: {
        profile() {
            let p = LocalAuth.profile()
            console.log(p);
        },
        createPost() {
            this.$store.dispatch('createPost', {
                content: this.post.content
            })
            this.post.content = ''
        },
        toggleCommentModal(post) {
            this.showCommentModal = !this.showCommentModal

            // if opening modal set selectedPost, else clear
            if (this.showCommentModal) {
                this.selectedPost = post
            } else {
                this.selectedPost = {}
            }
        },
        likePost(id, likesCount) {
            this.$store.dispatch('likePost', {
                id,
                likesCount
            })
        },
        async viewPost(post) {
            const docs = await commentsCollection.where('postId', '==', post.id).get()

            docs.forEach(doc => {
                let comment = doc.data()
                comment.id = doc.id
                this.postComments.push(comment)
            })

            this.fullPost = post
            this.showPostModal = true
        },
        closePostModal() {
            this.postComments = []
            this.showPostModal = false
        }
    },
    filters: {
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
        this.profile()
    }
}
</script>

<style lang="scss" scoped>
$sideBarW : 250px;
$mainLgW : calc(100% - 250px);

.mainRow {
    width: 100%;

    .sideBar {
        width: $sideBarW;
        position: absolute;
        left: -$sideBarW;
        background-color: gold;
        min-height: 600px;
        float: left;
        border-right: 2px solid silver;

        .menu-fade {
            position: absolute;
            top: 50%;
            left: 100%;
            width: 100px;
            height: 100px;
            background-color: #00162b61;
            border-radius: 100%;
            transform: translate(-75%, -50%);
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 5px;
            color: #f8f9fa;
            border: 2px solid #d6d8dbc4;
            cursor: pointer;

            &:hover {
                background-color: #00162b;
            }

        }

        .sideBarContent {
            position: relative;
            width: 100%;

            min-height: 100%;
        }
    }

    .main {
        float: right;
        width: 100%;
        background: rgba(0, 255, 149, 0.062);
    }

    &.with-side-bar {
        .sideBar {
            left: 0;
            z-index: 5;
        }

    }

    @media screen and (min-width: 768px) {

        .sideBar {
            position: relative;
            left: 0;

            .menu-fade {
                display: none;
            }
        }

        .main {
            width: $mainLgW;
        }
    }

}
</style>
