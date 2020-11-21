<template>
<section id="settings">
    <div class="col1">
        <h3>Settings</h3>
        <p>Update your profile</p>

        <transition name="fade">
            <p
                v-if="showSuccess"
                class="success">profile updated</p>
        </transition>
        <vo
            ref="form"
            v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(updateProfile)">
                <vp
                    name="name"
                    vid="name"
                    rules="required"
                    v-slot="{ valid, errors }">
                    <b-form-group
                        label="name"
                        :invalid-feedback="errors[0]"
                        :state="$root.vs(valid, errors)">
                        <b-form-input
                            v-model.trim="name"
                            placeholder="Name">

                        </b-form-input>
                    </b-form-group>
                </vp>
                <vp
                    name="title"
                    vid="title"
                    rules="required"
                    v-slot="{ valid, errors }">
                    <b-form-group
                        label="title"
                        :invalid-feedback="errors[0]"
                        :state="$root.vs(valid, errors)">
                        <b-form-input
                            v-model.trim="title"
                            placeholder="title">
                        </b-form-input>
                    </b-form-group>
                </vp>
                <vp
                    name="bloodGroup"
                    vid="bloodGroup"
                    rules="required"
                    v-slot="{ valid, errors }">
                    <b-form-group
                        label="bloodGroup"
                        :invalid-feedback="errors[0]"
                        :state="$root.vs(valid, errors)">
                        <b-form-select
                            v-model="bloodGroup"
                            :options="blodTypes"></b-form-select>
                    </b-form-group>
                </vp>
                <!-- <label for="name">Name</label>
                <input  type="text" :placeholder="userProfile.name" id="name" /> -->
                <button type="submit" class="btn btn-primary" tabindex="3">Update Profile</button>
            </form>
        </vo>
    </div>
</section>
</template>

<script>
import {
    BFormInput,
    BFormSelect,
    BFormGroup,
    BButton,
    BOverlay
} from 'bootstrap-vue';

import {
    blodTypes
} from "../plugins/dorDown";
import {
    auth,
    usersCollection
} from '@/firebase'

import {
    mapState
} from 'vuex'
import {
    LocalAuth
} from '@/plugins/LocalAuth';
import {
    Profile
} from '@/models';

export default {
    components: {
        BFormGroup,
        BFormInput,
        BFormSelect
    },
    data() {
        return {
            name: '',
            title: '',
            bloodGroup: '',
            thumb: '',
            blodTypes: blodTypes,
            showSuccess: false
        }
    },
    computed: {

    },
    methods: {

        async updateProfile() {
            const p = await LocalAuth.profile()

            const {
                name,
                title,
                bloodGroup,

            } = this;

            let data = await Profile.api().update(p, {
                name,
                title,
                bloodGroup
            });

            p.name = name;
            p.title = title;
            p.bloodGroup = bloodGroup

            LocalAuth.setProfile(p)
            Profile.query().where('id',p.id).update({data: {
                    name,
                    title,
                    bloodGroup
                }})
            this.$router.push({
                name: "Dashboard"
            })

        }

    },
    watch: {

    },
    async created() {

        const p = await LocalAuth.profile()
        const {
            name,
            title,
            bloodGroup,
            thumb
        } = p;
        this.name = name;
        this.title = title;
        this.bloodGroup = bloodGroup;
        // this.thumb = thumb;

        //  this.$store.dispatch('fetchUserProfile', { uid: auth.currentUser.uid })
    }
}
</script>
