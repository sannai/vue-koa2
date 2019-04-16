<template>
    <main style="height: calc(100vh - 155px);">
        <div class="wscn-http404">
            <div class="pic-404">
                <img class="pic-404__parent" :src="img_404" alt="404">
            </div>
            <div class="bullshit">
                <div class="bullshit__headline">很遗憾，您访问的页面挖不到了...</div>
                <el-button type="info" round size="mini" @click="handleClickReturn">返回首页</el-button>
            </div>
        </div>
    </main>
</template>

<script>
import img_404 from "@/images/404_images/404.png";

export default {
    data() {
        return {
            img_404
        };
    },
    methods: {
        // 跳转其他页面
        handleClickReturn() {
            this.$router.replace("/index");
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404 {
    background-color: #c9f5fe;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../images/404_images/bg.png) no-repeat bottom;
    .bullshit {
        margin-top: 20px;
        text-align: right;
        .bullshit__headline {
            font-size: 25px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(67, 198, 254, 1);
            margin-bottom: 20px;
        }
        .el-button {
            margin-top: 30px;
        }
    }
}
</style>
