<template>
  <!-- 留言板 -->
  <main class="message-board">
    <section class="left">
      <header class="entry-header">
        <h2>留言板</h2>
      </header>
      <div class="entry-content">
        <p>
          <img src="../../images/With-love-for-life.jpg" alt="" width="100%">
        </p>
        <p class="text">
          本小站记录了我在学习中遇到的一些困难，及用到的解决方法，
          很多方法来源于网络，在文章最后都指出了来源。
          如果有版权等方面的问题，
          请与我联系！
        </p>
      </div>
      <comment-area :commentList="commentList" :commentListPage="commentListPage" @handleAddMessageBoard="handleAddMessageBoard" @handleCurrentChange="handleCurrentChange" :title="'留言'"></comment-area>
    </section>
    <sidebar-right></sidebar-right>
  </main>
</template>

<script>
import {
    getSeeMessageBoard,
    postAddMessageBoard
} from "@/api/message-board.js";
import SidebarRight from "../main/sidebar-right";
import CommentArea from "@/components/comment-area";
export default {
    data() {
        return {
            commentList: [],
            commentListPage: {
                page: 1,
                total: 20
            },
            page: 1
        };
    },
    created() {
        let data = {
            page: 1,
            limit: 10
        };
        getSeeMessageBoard(this, data);
    },
    methods: {
        //提交
        handleAddMessageBoard(data) {
            postAddMessageBoard(this, data, '留言', this.page);
        },
        //分页
        handleCurrentChange(val) {
            this.page = val;
            let data = {
                page: val,
                limit: 10
            };
            getSeeMessageBoard(this, data);
        },
        //评论数据转换
        translateDataToTree(data) {
            this.commentListPage = data.pageing;
            if (data.data.length > 0) {
                //没有父节点的数据
                let parents = data.data.filter(
                    value =>
                        // console.log(value.commentPid,1)
                        value.commentPid === undefined ||
                        value.commentPid === null
                );

                //有父节点的数据
                let children = data.data.filter(
                    value =>
                        // console.log(value.commentPid,12)
                        value.commentPid !== undefined &&
                        value.commentPid !== null
                );
                //定义转换方法的具体实现
                let translator = (parents, children) => {
                    //遍历父节点数据
                    parents.forEach(parent => {
                        //遍历子节点数据
                        children.forEach((current, index) => {
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
        SidebarRight,
        CommentArea
    }
};
</script>

<style lang="scss">
@import "../../scss/my-element.scss";
.message-board {
  max-width: 1170px;
  margin: 20px auto;
  display: flex;
  .left {
    flex: 1;
    background-color: #fff;
    border: 1px solid #ededed;
    .entry-header {
      h2 {
        color: #333;
        font-size: 20px;
        text-align: center;
        margin: 20px 0;
      }
    }
    .entry-content {
      padding: 0 20px;
      .text {
        text-indent: 2em;
        margin: 20px 0;
        font-size: 16px;
        line-height: 1.8;
      }
    }
    .entry-footer {
      .pagination {
        margin-top: 20px;
        text-align: center;
      }
      .el-textarea__inner {
        min-height: 100px !important;
      }
    }
  }
}
</style>