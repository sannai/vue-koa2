<template>
    <main class="main">
        <sidebar-left :articleList='articleList'></sidebar-left>
        <sidebar-right></sidebar-right>
    </main>
</template>

<script>
import SidebarLeft from "./sidebar-left";
import SidebarRight from "./sidebar-right";
import BackToTop from "@/components/back-to-top";
import { getArticleList } from "@/api/main.js";
export default {
    data() {
        return {
            articleList: []
        };
    },
    created() {
        //main-列表
        getArticleList(this);
    },
    methods: {},
    components: {
        SidebarLeft,
        SidebarRight,
        BackToTop
    }
};
</script>

<style  lang='scss'>
.main {
    display: flex;
    height: calc(100vh - 180px);
    max-width: 1170px;
    margin: 20px auto;
}
</style>
