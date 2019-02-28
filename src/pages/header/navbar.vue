<template>
  <div class="menu">
    <el-menu :default-active="activeIndex" mode="horizontal" active-text-color="#fff" text-color="#fff" background-color="#24bebe">
      <el-menu-item index="1" class="navbar-list" @click="handleClickToRoute('/')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>
        <span class="text">首页</span>
      </el-menu-item>
      <el-submenu index="2" class="navbar-list">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-leimupinleifenleileibie"></use>
          </svg>
          <span class="text">分类</span>
        </template>
        <el-menu-item index="2-1">HTML</el-menu-item>
        <el-menu-item index="2-2">CSS</el-menu-item>
        <el-menu-item index="2-3">JavaScript</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" class="navbar-list" @click="handleClickToRoute('/chat-room')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-bid-archive"></use>
        </svg>
        <span class="text">聊天室</span>
      </el-menu-item>
      <el-menu-item index="4" class="navbar-list" @click="handleClickToRoute('/message-board')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liuyan"></use>
        </svg>
        <span class="text">留言</span>
      </el-menu-item>
    </el-menu>
    <div style="display: flex">
      <router-link to="/add-article">
        <el-button>
          发布文章
        </el-button>
      </router-link>
      <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            activeIndex: "1"
        };
    },
    methods: {
        handleClickToRoute(route) {
            this.$router.push(route);
        }
    }
};
</script>

<style  lang='scss'>
@import "../../scss/my-element.scss";
.menu {
  flex: 1;
  @include my-display(space-between);
  .el-menu.el-menu--horizontal {
    border: none;
  }
  .navbar-list {
    @include my-display();
    @include my-svg(#fff);
    .text {
      font-size: 16px;
      margin-left: 6px;
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
  }
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
    background-color: #eee;
    color: rgb(255, 208, 75);
  }
}
</style>
