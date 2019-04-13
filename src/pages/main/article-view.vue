<template>
    <main class="main">
        <router-view></router-view>
        <sidebar-right></sidebar-right>
    </main>
</template>

<script>
import SidebarRight from "./sidebar-right";
export default {
    components: {
        SidebarRight
    }
};
</script>

<style>
.main {
    display: flex;
    min-height: calc(100vh);
    width: 1040px;
    margin: 20px auto;
}
</style>
