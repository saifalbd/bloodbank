<template>
<v-dialog
    v-model="dialog"
    width="500">

    <template v-slot:activator="{ on, attrs }">
        <slot
            name="activator"
            v-bind:on="on">
            <v-btn
                color="red lighten-2"
                dark
                v-bind="attrs"
                v-on="on">
                Click Me
            </v-btn>
        </slot>
    </template>
    <v-card>
        <v-card-title class="text-center">
            <v-spacer></v-spacer>
            imput images
            <v-spacer></v-spacer>
            <v-btn
                small
                fab
                dark
                color="indigo"
                @click="dialog = false">
                <v-icon dark>
                    mdi-close
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="p-0">

            <v-row v-if="images.length">
                <v-col
                    cols="6"
                    sm="6"
                    v-for="(img,index) in images"
                    :key="index">

                    <v-img :src="img.dataUrl">
                        <div class="fill-height d-flex justify-space-between">

                            <vueCrop
                                :image="img"
                                @done="cropedImage($event,index)">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-bind="attrs"
                                        class="mx-2"
                                        fab
                                        dark
                                        x-small
                                        v-on="on">
                                        <v-icon dark>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                </template>
                            </vueCrop>
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                x-small
                                @click="close(index)">
                                <v-icon dark>
                                    mdi-close
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-img>
                </v-col>
            </v-row>
            <v-card
                v-else
                flat
                color="grey lighten-1"
                height="200px"></v-card>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn
                dark
                class="hidden-file-box">
                <v-icon left>
                    mdi-camera-account
                </v-icon>
                <input v-on:change="inputFile" type="file" class="hidden-file">
                add New Image
            </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                dark
                block
                @click="done">
                <v-icon left>
                    mdi-camera-account
                </v-icon>
                done
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import vueCrop from '@/components/vueCrop.vue';
export default {
    name: 'imagesCreateDialog',
    components: {
        vueCrop

    },
    props: {
        // images: {
        //     type: Array,
        //     default () {
        //         return []
        //     },
        // }
    },

    data() {
        return {
            dialog: false,
            images: [],
            file: null,

        }
    },
    methods: {
        close(index) {
            this.images.splice(index, 1);
        },
        done() {

this.$emit('images', this.images);
            this.dialog = false;
        },

        inputFile($event) {
            var input = $event.target;
            const file = input.files[0];

            if (input && input.files && file) {
                const {
                    type,
                    size,
                    name,
                    webkitRelativePath,
                    lastModifiedDate,
                    lastModified,
                } = file;
                const fileData = {
                    type,
                    size,
                    name,
                    webkitRelativePath,
                    lastModifiedDate,
                    lastModified
                };

                var reader = new FileReader();
                reader.onload = () => {
                    // console.log(reader);
                    var dataURL = reader.result;
                    fileData.dataUrl = dataURL;
                    this.images.push(fileData);

                };
                reader.readAsDataURL(file);
            }
            // console.log(input.files[0])
        },
        cropedImage($event, index) {

            this.images = this.images.map((img, i) => {
                if (i == index) {
                    return $event;
                } else {
                    return img;
                }

            });

            

        }
    }

}
</script>

<style lang="scss" scoped>
.hidden-file-box {
    position: relative;
    overflow: hidden;

    background-color: red;
    // display: flex;
    // justify-content: flex-end;
    // width: 100%;

    .hidden-file {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        opacity: 0;
    }
}
</style>
