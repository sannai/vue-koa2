<template>
    <footer class="footers">
        <p>
            Design by &emsp;|&emsp;
            <router-link to="/">牵着蜗牛去旅行</router-link>&emsp;|&emsp;
            备案号：
            <router-link to="/">粤ICP备19000813号-1</router-link>&emsp;|&emsp;
            云储存：七牛云提供 CDN 加速
        </p>
        <p>联系我：扫二维码</p>
    </footer>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style  lang='scss'>
.footers {
    height: 50px;
    text-align: center;
    padding: 20px 0 10px 0;
    p:last-child {
        margin-top: 10px;
    }
}
</style>
