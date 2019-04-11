<template>
    <div id="app">
        <Header></Header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "./pages/header";
import Navbar from "./pages/header/navbar";
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
