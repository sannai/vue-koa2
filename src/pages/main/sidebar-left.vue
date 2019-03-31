<template>
    <section class="sidebar-left">
        <template v-if="articleList.length > 0">
            <a class="item-wrap" v-for="item in articleList" :key="item.articleId" @click="handleToArticleDetails(item)">
                <h3 class="title">{{item.title}}</h3>
                <div class="introduction" v-html="item.introduction"></div>
                <div class="info-icon">
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
                </div>
                <div class="content-item-actions">
                    <my-tag v-for="t in item.knowledge" :key="t.id">{{t.name}}</my-tag>
                    <span class="read">阅读全文》</span>
                </div>
            </a>
        </template>
        <div v-else class="not-data">
            暂无数据
        </div>
    </section>
</template>

<script>
import { getArticleList } from "@/api/main.js";
import articleImg from "../../images/1.png";
import MyTag from "@/components/my-tag";
export default {
    data() {
        return {
            isRouterName: true,
            articleList: []
        };
    },
    created() {
        getArticleList(this);
    },
    methods: {
        handleToArticleDetails(item) {
            this.$router.push({
                name: "artcle-detail",
                params: { id: item._id }
            });
        }
    },
    components: {
        MyTag
    }
};
</script>

<style  lang='scss'>
@import "../../scss/my-element.scss";
.sidebar-left {
    width: 750px;
    background-color: #fff;
    margin-right: 30px;
    .item-wrap {
        display: block;
        margin: 20px;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        cursor: pointer;
        .title {
            font-size: 30px;
            font-weight: 500;
            margin-bottom: 20px;
        }
        .info-icon {
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
        .introduction {
            img {
                width: 100%;
                margin: 10px 0;
            }
        }
        .content-item-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    .not-data {
        @include my-display();
        height: calc(100vh - 180px);
    }
}
</style>
