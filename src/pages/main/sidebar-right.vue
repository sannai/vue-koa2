<template>
  <article class="sidebar-right">
    <div class="title">
      <h3>最新评论</h3>
      <p>更多留言</p>
    </div>
    <ul>
      <li v-for="item in latelyComment" :key="item.id" class="lately-comment-list">
        <p class="name">{{item.name}}</p>
        <p class="content">{{item.content}}</p>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
    data() {
        return {
            latelyComment: [
                {
                    id: 1,
                    name: "刘备",
                    content: "我是皇帝"
                },
                {
                    id: 2,
                    name: "诸葛亮",
                    content:
                        "我是丞相,志当存高远，鞠躬尽瘁死而后已，政治家、军事家、啦啦啦啦啦啦啦啦啦啦啦"
                },
                {
                    id: 3,
                    name: "关羽",
                    content: "我是战神"
                },
                {
                    id: 4,
                    name: "张飞",
                    content: "我是万人敌"
                },
                {
                    id: 5,
                    name: "赵云",
                    content: "我是一身胆"
                }
            ]
        };
    }
};
</script>

<style  lang='scss'>
.sidebar-right {
  width: 259px;
  margin-left: 40px;
  .title {
    padding: 10px;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ul {
    background-color: #fff;
    .lately-comment-list {
      border-bottom: 1px solid #ccc;
      padding: 6px 10px;
      .name {
        color: #333;
        font-size: 14px;
      }
      .content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        height: 24px;
        line-height: 24px;
      }
    }
  }
}
</style>
