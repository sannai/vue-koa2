<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "./pages/header";
import Main from "./pages/main";
import Footer from "./pages/footer";
export default {
    name: "App",
    components: {
        Header,
        Main,
        Footer
    }
};
</script>

<style>
@import "../src/scss/reset.css";
</style>
