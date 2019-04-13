<template>
    <article class="sidebar-right">
        <div class="select" v-if="$store.state.main.isSelect">
            <el-input placeholder=" 请输入内容" v-model="keyWord" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="handleSelect"></el-button>
            </el-input>
        </div>
        <div class="about_me">
            <h2>关于我</h2>
            <p>
                <img src="../../images/1.jpg">
                <b>疯一样的男子</b>，
                一个90后贵族出身的疯男子！17年入行。
                一直潜心研究web前端技术，一边工作一边积累经验(其实就是混日子)，分享（复制）一些个人博客文章，以及SEO优化等心得 。
            </p>
        </div>
        <div class="attention">
            <h2>关注我</h2>
            <img src="../../images/wx.png" alt="我的微信" />
        </div>
    </article>
</template>

<script>
import { getArticleList } from "@/api/main";
import { articleSelect } from "@/utils/articleSelect";
export default {
    data() {
        return {
            keyWord: "",
            isclick: true,
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
    },
    methods: {
        //路由跳转
        handleClickToRoute(route) {
            this.$router.push(route);
        },
        //搜索
        handleSelect() {
            articleSelect.handleSelect(this, getArticleList);
        }
    }
};
</script>

<style  lang='scss'>
.sidebar-right {
    width: 260px;
    h2 {
        color: #333;
        font-size: 14px;
        line-height: 30px;
        padding-left: 20px;
        background: #fff;
    }
    .about_me {
        background: rgba(255, 255, 255, 0.5);
        margin-bottom: 20px;
        p {
            padding: 10px;
            text-align: justify;
            img {
                width: 120px;
                height: 120px;
                margin-right: 10px;
                float: left;
            }
        }
    }
    .attention {
        background: rgba(255, 255, 255, 0.5);
        img {
            box-sizing: border-box;
            padding: 10px;
            width: 100%;
        }
    }
    .select {
        display: flex;
        margin-bottom: 20px;
    }
}
</style>
