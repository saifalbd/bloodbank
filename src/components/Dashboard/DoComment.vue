<template>
<!-- Using components -->
<vo
    v-show="show"
    tag="div"
    ref="doComment">
    <vp
        name="content"
        vid="content"
        :rules="{required:true}"
        v-slot="{ valid, errors }">
        <b-input-group prepend="comment">
            <b-form-input
                :state="$root.vs(valid,errors)"
                rows="1"
                max-rows="4"
                v-model="content"></b-form-input>
            <b-input-group-append>
                <b-button
                    variant="outline-success"
                    v-if="loding">

                    <b-icon-arrow-clockwise animation="spin"></b-icon-arrow-clockwise>

                </b-button>
                <b-button
                    class="pl-3 pr-3"
                    variant="outline-success"
                    @click="submit"
                    v-else>
                    <b-icon-pencil-square></b-icon-pencil-square>
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </vp>
</vo>
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
    BIconCommand,
    BIconShareFill,
    BBadge,
    BContainer,
    BIconPencilSquare,
    BInputGroup,
    BFormTextarea,
    BInputGroupAppend,
    BIconArrowClockwise,
    BFormInput,

} from "bootstrap-vue";
import Vue, {
    PropType
} from 'vue'

import {
    commentsCollection,
    postsCollection,
    auth
} from '@/firebase'
import {
    Comment
} from '@/models';

export default Vue.extend({
    components: {
        BIconArrowClockwise,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BButton,
        BIconPencilSquare,
    },
    props: {
        loding: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: false
        },
        post: {
            type: Object as PropType < post > ,
            required: true,
        }

    },
    data() {
        return {
            content: ''
        }
    },
    methods: {
        async submit() {

            let ref: any = this.$refs['doComment'];

            let isValid = await ref.validate()
            if (isValid) {
                this.$emit('done', this.content)

                let a: any = auth.currentUser;

                let data = {
                    createdOn: Date.now(),
                    content: this.content,
                    postId: this.post.$id,
                    userId: a.uid,
                    likes:0,
                    replyes: 0,
                    by: this.$store.state.userProfile,
                };

                await Comment.api().create(data)

                // create comment

                // update comment count on post
                // await postsCollection.doc(this.post.$id).update({
                //     comments: this.post.comments + 1
                // })

                // close modal
                this.$emit('close')
            }

        }

    }

});
</script>

<style lang="scss" scoped>

</style>
