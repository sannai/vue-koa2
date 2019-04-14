<template>
    <!-- 头部 -->
    <header class="headers">
        <nav class="navs">
            <h1>
                <router-link to="/">
                    牵着蜗牛去旅行
                </router-link>
            </h1>
            <ul class="navigation">
                <li v-for="item in navigation" :key="item.id">
                    <router-link :to="{name: item.pathName}" active-class="router-link-active">
                        {{item.name}}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { getKnowledgePoint } from "@/api/knowledge-point";

export default {
    data() {
        return {
            navigation: [
                {
                    id: 1,
                    name: "首页",
                    pathName: "idx"
                },
                // {
                //     id: 2,
                //     name: "分类",
                //     pathName: ""
                // },
                {
                    id: 3,
                    name: "留言",
                    pathName: "Message"
                },
                {
                    id: 4,
                    name: "列表",
                    pathName: "ArticleList"
                },
                {
                    id: 5,
                    name: "关于",
                    pathName: "About"
                }
            ],
            knowledgePointList: []
        };
    },
    created() {
        getKnowledgePoint(this);
    },
    methods: {
        handleClickLogo() {
            this.$router.push("/");
        }
    }
};
</script>

<style  lang='scss'>
@import "../../scss/my-element.scss";
.headers {
    display: flex;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.9);
    position: sticky;
    z-index: 1;
    top: 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
    .navs {
        width: 1040px;
        height: 100%;
        margin: 0px auto;
        @include my-display(space-between);
        a {
            color: #555;
        }
        a:hover {
            color: #000;
        }
        h1 {
            font-size: 22px;
            cursor: pointer;
            font-weight: normal;
        }
        .navigation {
            height: 100%;
            @include my-display();
            li {
                height: 100%;
                @include my-display();
                padding-left: 40px;
                font-size: 16px;
                a {
                    cursor: pointer;
                }
            }
            .router-link-active {
                color: #f65a8a;
            }
        }
    }
}
</style>
