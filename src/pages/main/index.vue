<template>
    <!-- 首页 -->
    <main class="main">
        <sidebar-left></sidebar-left>
        <sidebar-right></sidebar-right>
    </main>
</template>

<script>
import SidebarLeft from "./sidebar-left";
import SidebarRight from "./sidebar-right";
export default {
    components: {
        SidebarLeft,
        SidebarRight
    }
};
</script>

<style  lang='scss'>
.main {
    display: flex;
    min-height: calc(100vh);
    width: 1040px;
    margin: 20px auto;
}
</style>
