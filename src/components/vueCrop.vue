<template>
<div>

    <b-modal
        v-model="$attrs.value"
        content-class="m-0 p-0"
        body-class="m-0 p-0"
        hide-header
        hide-footer
        hide-header-close>
        <b-card
            header="Cropm Pickture"
            header-tag="header"
            footer-tag="footer">
            <b-card-text>
                <cropper
                    v-if="$attrs.value"
                    ref="cropper"
                    class="cropper"
                    :src="src"
                    :stencil-props="{aspectRatio}"></cropper>
            </b-card-text>

            <template #footer>
                <b-container class="d-flex justify-content-end">
                    <b-button
                        class="mr-1"
                        @click="$emit('cancel',$event)"
                        variant="dark">Cancel</b-button>
                    <b-button
                        class="ml-1"
                        @click="cropData"
                        variant="primary">Crop</b-button>

                </b-container>

            </template>

        </b-card>
    </b-modal>

</div>
</template>

<script>
import {
    Cropper
} from 'vue-advanced-cropper'
import {

    BModal,
    BCard,
    BCardText,
    BButton,
    BContainer,

} from "bootstrap-vue";
export default {
    name: 'vueCrop',
    components: {

        BModal,
        BCard,
        BCardText,
        BButton,
        BContainer,

    },
    props: {
        aspectRatio: {
            type: Number,
            default: 1

        },
        src: {
             type: String,

            required: true,
        }
    },
    data() {
        return {
            dialog: true,
            copedImg: '',
            coordinates: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },

        }
    },
    methods: {
        // change({
        //     coordinates,
        //     canvas
        // }) {

        //     console.log(coordinates, canvas)
        // },
        cropData() {

            const {
                coordinates,
                canvas,
            } = this.$refs.cropper.getResult();
            this.coordinates = coordinates;
            // You able to do different manipulations at a canvas
            // but there we just get a cropped image
            
            let src = canvas.toDataURL()

            this.$emit('done',src );
            this.dialog = false;

          
        }
    },

}
</script>

<style lang="scss" scoped>
.cropper {

    background: #DDD;
}
</style>
