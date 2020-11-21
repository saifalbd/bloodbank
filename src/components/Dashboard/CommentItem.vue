<template>
<b-list-group-item
    href="#"
    class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h6 class="mb-1">
            {{comment.by.name}}
        </h6>
        <small>{{comment.createdOn | timeAgo}}</small>
    </div>

    <p class="mb-1 pl-2">
        {{comment.content}}
    </p>

    <!-- <small>Donec id elit non mi porta.</small> -->
</b-list-group-item>
</template>

<script lang="ts">
import Vue, {
    PropType
} from 'vue'
import {
    BListGroupItem
} from "bootstrap-vue";
import moment from 'moment'

export default Vue.extend({
    components: {
        BListGroupItem

    },
    props: {
        comment: {
            type: Object as PropType < comment > ,
            required: true,
        }
    },
    filters: {

        timeAgo(val: number) {

            return moment(val).fromNow(true)

        },

    },

})
</script>

<style scoped>

</style>
