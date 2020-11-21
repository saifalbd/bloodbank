<template>
<div id="dashboard">
    <b-overlay :show="busy">

        <b-container class="mt-5">
            <b-row>
                <b-col
                    md="4"
                    v-for="(user , index) in users"
                    :key="index">
                    <div>
                        <b-card
                            :title="user.name"
                            :sub-title="user.title"
                            :img-src="imageUrl(user)"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                            class="mb-2">

                            <b-card-text>
                                <b-table-simple
                                    hover
                                    small
                                    caption-top
                                    stacked>

                                    <b-tbody>
                                        <b-tr>
                                            <b-th
                                                stacked-heading="type"
                                                class="text-left">Value</b-th>
                                            <b-td stacked-heading="Blood Group">{{user.bloodGroup}}</b-td>
                                            <b-td stacked-heading="Donate Times">2</b-td>
                                        </b-tr>
                                    </b-tbody>

                                </b-table-simple>

                            </b-card-text>

                            <b-row class="d-flex justify-content-around">
                                <b-button
                                    href="#"
                                    size="sm"
                                    variant="info">details</b-button>
                                <b-button
                                    v-if="auth.editor"
                                    href="#"
                                    size="sm"
                                    variant="primary">admin Edit</b-button>
                            </b-row>

                        </b-card>
                    </div>
                </b-col>
            </b-row>

        </b-container>
    </b-overlay>
</div>
</template>

<script>
import {
    auth,
    usersCollection
} from '@/firebase'
import {
    mapState
} from 'vuex'

import {
    Profile
} from '@/models/index';

import {
    FetchMember
} from './internal/FetchMember'

import {
    BRow,
    BCol,
    BContainer,
    BCard,
    BTableSimple,
    BTbody,
    BTr,
    BTh,
    BTd,
    BCardText,
    BButton,
    BOverlay

} from 'bootstrap-vue';

export default {
    components: {
        BRow,
        BCol,
        BContainer,
        BCard,
        BCardText,
        BTableSimple,
        BTh,
        BTd,
        BTbody,
        BTr,
        BButton,
        BOverlay
    },
    data() {
        return {
            busy: true,
            post: {
                content: ''
            },
            auth: {},
            users: []

        }
    },
    computed: {

        // users() {
        //     return Profile.all();
        // }

    },
    methods: {
        imageUrl(user) {
            let url = ''
            if (user.thumb) {
                url = user.thumb.url;

            }

            return this.$root.thumb(url)

        },
        async authData() {

            return await usersCollection.doc(auth.currentUser.uid).get();

        },
        async addImage(user) {
            let data = await (new FetchMember).getImage(user)

           

            user.thumb = data;

        },

    },

    async created() {

        let data = await (new FetchMember).userCollection()

        this.users = data;

        this.users.forEach(this.addImage)

        this.busy = false


    }
}
</script>

<style lang="scss" scoped>

</style>
