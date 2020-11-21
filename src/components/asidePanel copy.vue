<template>
<div>

    <div
        class="b-sidebar-body"
        id="sidebar-1"
        title="Sidebar">
        <div class="px-3 py-2">

            <b-img
                src="https://picsum.photos/500/500/?image=54"
                fluid
                thumbnail></b-img>
        </div>

        <b-list-group>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
                Total Post
                <b-badge
                    variant="primary"
                    pill>14</b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
                Total Donate
                <b-badge
                    variant="primary"
                    pill>2</b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
                Total Commnents
                <b-badge
                    variant="primary"
                    pill>1</b-badge>
            </b-list-group-item>
        </b-list-group>

    </div>
</div>
</template>

<script>
import {
    BSidebar,
    BImg,
    BListGroup,
    BListGroupItem,
    BBadge
} from "bootstrap-vue";

export default {
    components: {

        BImg,
        BListGroup,
        BListGroupItem,
        BBadge
    }
}
</script>

<style lang="scss" scoped>

</style>
