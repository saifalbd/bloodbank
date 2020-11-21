<template>
<b-modal
    v-model="$attrs.value"
    content-class="m-0 p-0"
    body-class="m-0 p-0"
    hide-header
    hide-footer
    hide-header-close>
    <b-card
        header="Reset PassWord"
        header-tag="header"
        footer-tag="footer">
        <b-card-text>

            <vo
                tag="div"
                ref="doComment">
                <vp
                    name="content"
                    vid="content"
                    :rules="{required:true}"
                    v-slot="{ valid, errors }">
                    <b-input-group prepend="Email">
                        <b-form-input
                            :state="$root.vs(valid,errors)"
                            rows="1"
                            max-rows="4"
                            v-model="email"></b-form-input>

                    </b-input-group>
                </vp>
            </vo>

        </b-card-text>

        <template #footer>
            <b-container class="d-flex justify-content-end">
                <b-button
                    variant="outline-success"
                    v-if="loding">

                    <b-icon-arrow-clockwise animation="spin"></b-icon-arrow-clockwise>

                </b-button>
                <b-button
                    class="pl-3 pr-3"
                    variant="outline-success"
                    @click="resetPassword"
                    v-else>
                    
                    <b-icon-unlock-fill></b-icon-unlock-fill>
                    <span class="ml-2">Reset</span>
                </b-button>

            </b-container>

        </template>

    </b-card>
</b-modal>
</template>

<script>
import {
    auth
} from '@/firebase'

import {

    BModal,
    BCard,
    BCardText,
    BButton,
    BContainer,
    BIconUnlockFill,
    BIconArrowClockwise,
    BFormInput,
    BInputGroup

} from "bootstrap-vue";

export default {
    components: {
        BModal,
        BCard,
        BCardText,
        BButton,
        BContainer,
         BIconUnlockFill,
    BIconArrowClockwise,
     BFormInput,
    BInputGroup

    },
    data() {
        return {
            email: '',
            showSuccess: false,
            errorMsg: '',
            loding:false
        }
    },
    methods: {
        async resetPassword() {
            this.errorMsg = ''

            try {
              this.loding = true;
                await auth.sendPasswordResetEmail(this.email)
                this.showSuccess = true
            } catch (err) {
                this.errorMsg = err.message
            }
        }
    }
}
</script>
