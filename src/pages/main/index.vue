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
    min-height: calc(100vh - 160px);
    width: 1040px;
    margin: 10px auto;
}
</style>
