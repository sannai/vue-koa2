<template>
    <header class="headers">
        <section class="navs">
            <h1 @click="handleClickLogo">我的博客</h1>
            <Navbar></Navbar>
        </section>
    </header>
</template>

<script>
import Navbar from "./navbar";

export default {
    data() {
        return {};
    },
    components: {
        Navbar
    },
    methods: {
        handleClickLogo() {
            this.$router.push({
                path: "/index"
            });
        }
    }
};
</script>

<style  lang='scss'>
@import "../../scss/my-element.scss";
.headers {
    display: flex;
    height: 75px;
    background-color: #24bebe;
    position: sticky;
    z-index: 1;
    top: 0;
    .navs {
        width: 1040px;
        margin: 20px auto;
        @include my-display();
        h1 {
            font-size: 28px;
            color: #fff;
            margin-right: 40px;
            cursor: pointer;
        }
    }
}
</style>
