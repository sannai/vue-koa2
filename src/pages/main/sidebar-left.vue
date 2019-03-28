<template>
    <section class="sidebar-left">
        <template v-if="articleList.length > 0">
            <el-card shadow="always" v-for="item in articleList" :key="item.articleId" @click="handleToArticleDetails(item)">
                <h3 class="entry-title">{{item.title}}6</h3>
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
                    <!-- <span class="dot">|</span>
                            <span class="entry">
                            <span>{{item.readNumber}}</span>阅读量
                        </span> -->
                </div>
                <!-- <div class="article-ontent">
                    <div v-html="item.content"></div>
                </div> -->
                <div class="entry-footer">
                    <div class="tag-label">
                        <el-tag type="success" v-for="t in item.knowledge" :key="t.id">{{t.name}}</el-tag>
                    </div>
                    <span class="read">阅读全文》</span>
                </div>
            </el-card>
        </template>
        <div v-else class="not-data">
            暂无数据
        </div>
    </section>
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
    background-color: #fff;
    .entry-title {
        font-size: 30px;
        font-weight: 500;
        margin-bottom: 20px;
    }
    .introduction {
        img {
            height: 100%;
            margin: 10px 0;
        }
    }
    .el-card {
        margin-bottom: 20px;
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
    .el-card:hover {
        box-shadow: 0 0 10px rgb(172, 145, 145);
    }
    .not-data {
        @include my-display();
        height: calc(100vh - 180px);
    }
}
</style>
