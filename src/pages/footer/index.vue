<template>
  <footer class="footer">
    <div class="box-md">
      <p>
        <a href="">© 2019 我的博客</a>
      </p>
      <p>
        <a href="">部署在阿里云 | </a>
        <a href="">由七牛云储存提供 CDN 加速</a>
      </p>
    </div>
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
.footer {
  height: 50px;
  background-color: #24bebe;
  .box-md {
    width: 1170px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    p {
      margin-top: 10px;
      
      a {
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>
