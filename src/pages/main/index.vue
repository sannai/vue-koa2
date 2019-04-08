<template>
    <main class="main">
        <router-view></router-view>
        <sidebar-right></sidebar-right>
    </main>
</template>

<script>
import SidebarLeft from "./sidebar-left";
import SidebarRight from "./sidebar-right";
import BackToTop from "@/components/back-to-top";
export default {
    components: {
        SidebarRight
    }
};
</script>

<style  lang='scss'>
.main {
    display: flex;
    min-height: calc(100vh - 160px);
    width: 1040px;
    margin: 20px auto 0;
}
</style>
