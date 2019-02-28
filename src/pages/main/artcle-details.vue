<template>
  <main>
    <div class="artcle-details">
      <section class="left">
        <el-card shadow="always" v-for="item in artcleDetails" :key="item.articleId">
          <div class="card-box">
            <div style="padding: 14px;">
              <div class="entry-title">{{item.title}}</div>
              <div class="tag-label">
                <el-tag type="success" v-for="t in item.knowledge" :key="t.id">{{t.name}}</el-tag>
              </div>
              <div class="introduction" v-html="item.introduction"></div>
              <h3>内容区</h3>
              <div class="article-ontent" v-html="item.content"></div>
            </div>
          </div>
        </el-card>
        <comment-area :commentList="commentList" :commentListPage="commentListPage" @handleAddMessageBoard="handleAddMessageBoard" @handleCurrentChange="handleCurrentChange" :title="'留言'"></comment-area>
      </section>
      <sidebar-right></sidebar-right>
    </div>
    <back-to-top></back-to-top>
  </main>

</template>

<script>
import { getArtcleDetails, postAddComment, getComment } from "@/api/main.js";
import SidebarLeft from "./sidebar-left";
import SidebarRight from "./sidebar-right";
import BackToTop from "@/components/back-to-top";
import CommentArea from "@/components/comment-area";
export default {
    data() {
        return {
            artcleDetails: [],
            commentList: [],
            commentListPage: {
                page: 1,
                total: 20
            },
            page: 1
        };
    },
    created() {
        //文章详情
        getArtcleDetails(this, this.$route.params.id);
        //文章评论
        let data = {
            page: 1,
            limit: 10
        };
        getComment(this, this.$route.params.id, data);
    },
    computed: {
        //评论
        commentData() {
            let data = [];
            this.commentList.forEach((item, index) => {
                data = item.content;
            });
            return data;
        }
    },
    methods: {
        //提交
        handleAddMessageBoard(data) {
            postAddComment(this, this.artcleDetails[0]._id, data, this.page);
        },
        //分页
        handleCurrentChange(val) {
            this.page = val;
            let data = {
                page: val,
                limit: 10
            };
            getComment(this, this.$route.params.id, data);
        },
        //评论数据转换
        translateDataToTree(data) {
            this.commentListPage = data.pageing;
            if (data.data.length > 0) {
                //没有父节点的数据
                let parents = data.data.filter(
                    value =>
                        value.content.commentPid === undefined ||
                        value.content.commentPid === null
                );

                //有父节点的数据
                let children = data.data.filter(
                    value =>
                        value.content.commentPid !== undefined &&
                        value.content.commentPid !== null
                );
                //定义转换方法的具体实现
                let translator = (parents, children) => {
                    //遍历父节点数据
                    parents.forEach((parent, index) => {
                        Object.assign(parent, {...parent.content});
                        //遍历子节点数据
                        children.forEach((current, index) => {
                            Object.assign(current, {...current.content});
                            //此时找到父节点对应的一个子节点
                            if (current.commentPid === parent._id) {
                                //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
                                let temp = JSON.parse(JSON.stringify(children));
                                //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
                                temp.splice(index, 1);
                                //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
                                // translator([current], temp);
                                //把找到子节点放入父节点的children属性中

                                typeof parent.children !== "undefined"
                                    ? parent.children.push(current)
                                    : (parent.children = [current]);
                            }
                        });
                    });
                };
                //调用转换方法
                translator(parents, children);
                this.commentList = parents;
            }
        }
    },
    components: {
        SidebarLeft,
        SidebarRight,
        BackToTop,
        CommentArea
    }
};
</script>

<style lang="scss">
@import "../../scss/my-element.scss";
.artcle-details {
  max-width: 1170px;
  display: flex;
  margin: 20px auto;
  min-height: 758px;
  .left {
    width: 871px;
    .entry-title {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .introduction {
      img {
        width: 100%;
        margin: 10px 0;
      }
    }
    .el-card {
      margin-bottom: 20px;
      .card-box {
        .article-ontent {
          color: #333;
          font-size: 16px;
          font-family: Hiragino Sans GB;
          text-indent: 2em;
          line-height: 28px;
        }
        h3 {
          text-align: center;
          padding: 30px 0;
          font-size: 20px;
          color: #444;
        }
      }
    }
    .comment {
      margin-bottom: 30px;
      .title {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        background-color: #fafafa;
        font-size: 16px;
        @include my-display(space-between);
      }
      .content {
        padding-bottom: 30px;
        background-color: #fff;
        .comment-box {
          .comment-name {
            font-size: 16px;
            padding: 10px 0;
          }
          .comment-content {
            font-size: 14px;
          }
          .lately-children {
            margin-left: 20px;
            border-bottom: 1px solid #ccc;
            padding: 6px 10px;
            @include my-display(space-between);
          }
          .lately-list {
            border-bottom: 1px solid #ccc;
            @include my-display(space-between);
            padding: 16px 10px;
          }
          .reply {
            text-align: center;
            height: 43px;
            line-height: 43px;
            width: 60px;
            cursor: pointer;
          }
        }
      }
    }
    .el-textarea__inner {
      min-height: 100px !important;
    }
  }
}
</style>
