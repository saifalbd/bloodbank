<template>
<div>
    <vo ref="postcreateForm">

        <vp
            name="content"
            vid="content"
            :rules="{required:true}"
            v-slot="{ valid, errors }">
            <!--  description="Let us know your name." -->
            <b-form-group
                label="Share Your Mind"
                label-for="input-1"
                valid-feedback="all are ok"
                :invalid-feedback="errors[0]?errors[0]:''"
                :state="$root.vs(valid,errors)">

                <b-form-textarea
                    id="textarea"
                    v-model="text"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                    :state="$root.vs(valid,errors)"></b-form-textarea>
            </b-form-group>
        </vp>

        <b-container class="d-flex justify-content-end">
            <b-button
                v-if="loding"
                variant="warning">
                <b-icon-arrow-clockwise animation="spin"></b-icon-arrow-clockwise>
            </b-button>
            <b-button
                v-else
                @click="submit">

                submit </b-button>
        </b-container>

    </vo>
</div>
</template>

<script lang="ts">
import {
    BButton,
    BFormGroup,
    BFormTextarea,
    BContainer,
    BIconArrowClockwise

} from "bootstrap-vue";

import Vue, {
    VNode
} from 'vue'
import Post from '@/models/Posts';
import {
    auth
} from '@/firebase';

export default Vue.extend({
    components: {
        BButton,
        BFormGroup,
        BFormTextarea,
        BContainer,
        BIconArrowClockwise
    },
    data() {
        return {
            text: '',
            loding: false
        }
    },
    methods: {
        async submit() {
            let refs = this.$refs['postcreateForm'] as any;
            let isValid = await refs.validate() as any;
            if (!auth.currentUser) {
                this.$router.push({
                    name: 'Login'
                })
                return false
            }
            if (isValid) {

                let a:any = auth.currentUser;

                this.loding = true
                let content = this.text as string;
                let user = this.$store.state.userProfile as any;

                let data = {
                    content,
                    userId: a.uid,
                    by: user,
                    likes:0,
                    comments:0,
                    shares:0,
                    createdOn:Date.now()
                }

                await Post.api().create(data);

                this.loding = false

            }
        }
    }

});
</script>

<style lang="scss" scoped>

</style>
