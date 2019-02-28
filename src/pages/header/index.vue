<template>
  <header class="header">
    <div class="nav">
      <div class="logo" @click="handleClickLogo">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tubiaozhizuo-"></use>
        </svg> -->
        <h1>我的博客</h1>
      </div>
      <Navbar></Navbar>
    </div>
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
                path: '/index'
            });
        }
    }
};
</script>

<style  lang='scss'>
@import "../../scss/my-element.scss";
.header {
  background-color: #24bebe;
  position: sticky;
  top: 0;
    height: 75px;
  .nav {
    margin: 0 auto;
    max-width: 1170px;
    display: flex;
    height: 100%;
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-right: 50px;
      svg {
        width: 4vw;
        height: 4vw;
        fill: #fff;
      }
      h1 {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}
</style>
