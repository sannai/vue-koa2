<template>
    <section>
        <Header></Header>
        <router-view />
        <Footer></Footer>
    </section>
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
@import "../src/css/reset.css";
</style>
