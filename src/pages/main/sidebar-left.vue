<template>
  <div class="sidebar-left">
    <el-card shadow="always" v-for="item in articleList" :key="item.articleId">
      <div class="card-box" @click="handleToArticleDetails(item)">
        <div style="padding: 14px;">
          <div class="entry-title">{{item.title}}</div>
          <div class="introduction" v-html="item.introduction"></div>
          <div class="icon-info">
            <time class="entry time">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-rili"></use>
              </svg>
              <span>{{item.createDate}}</span>
            </time>
            <span class="dot">|</span>
            <span class="entry">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liuyan"></use>
              </svg>
              <span>{{item.commentNumber|| '暂无评论'}}</span>
            </span>
            <span class="dot">|</span>
            <span class="entry">
              <span>{{item.readNumber}}</span>阅读量
            </span>
          </div>
          <div class="article-ontent">
            <div v-html="item.content"></div>
          </div>
          <div class="entry-footer">
            <div class="tag-label">
              <el-tag type="success" v-for="t in item.knowledge" :key="t.id">{{t.name}}</el-tag>
            </div>
            <span class="read">阅读全文》</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import articleImg from "../../images/1.png";
export default {
    props: {
        articleList: Array
    },
    created() {},
    methods: {
        handleToArticleDetails(item) {
            this.$router.push({
                name: "artcle-details",
                params: { id: item._id }
            });
        }
    }
};
</script>

<style  lang='scss'>
@import "../../scss/my-element.scss";
.sidebar-left {
  flex: 1;
  .entry-title {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .introduction{
      img{
          width: 100%;
          margin: 10px 0;
      }
  }
  .el-card {
    margin-bottom: 20px;
    .card-box {
      cursor: pointer;
      .icon-info {
        display: flex;
        margin: 20px 0;
        @include my-svg(#ccc, 20px, 20px);
        svg {
          margin-right: 5px;
        }

        .entry {
          height: 20px;
          display: flex;
          align-items: center;
          color: #aaa;
        }
        .dot {
          height: 20px;
          line-height: 20px;
          padding: 0 20px;
          color: #eee;
        }
      }
      .article-ontent {
        color: #333;
        font-size: 16px;
        line-height: 1.5;
      }
      .entry-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tag-label {
          .el-tag {
            margin-right: 10px;
          }
        }
        .read {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
