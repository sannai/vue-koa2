<template>
    <section class="sidebar-left">
        <template v-if="articleList.length > 0">
            <a class="item-wrap" v-for="item in articleList" :key="item.articleId" @click="handleToArticleDetails(item)">
                <h3 class="title">{{item.title}}</h3>
                <my-tag v-for="t in item.knowledge" :key="t.id">{{t.name}}</my-tag>
                <div class="introduction" v-html="item.introduction"></div>
                <div class="info-icon">
                    <div>
                        <time class="entry time" title="创建时间">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-rili"></use>
                            </svg>
                            <span>{{item.createDate.slice(0,10)}}</span>
                        </time>
                        <span class="dot">|</span>
                        <span class="entry" title="留言数量">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-liuyan"></use>
                            </svg>
                            <span>{{item.commentNumber|| '暂无评论'}}</span>
                        </span>
                    </div>
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
import { mapState } from "vuex";
import { getArticleList } from "@/api/main.js";
import articleImg from "../../images/1.png";
import MyTag from "@/components/my-tag";
export default {
    created() {
        let data = {
            page: 1,
            limit: 10
        };
        getArticleList(this, data);
        this.$store.commit("handleIsSelect", true);
    },
    computed: {
        ...mapState({
            articleList: state => state.main.articleList,
            articleListPage: state => state.main.articleListPage
        })
    },
    methods: {
        handleToArticleDetails(item) {
            this.$router.push({
                name: "ArtcleDetail",
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
        border: 1px solid #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        cursor: pointer;
        .title {
            font-size: 30px;
            font-weight: 500;
            margin-bottom: 20px;
        }
        .info-icon {
            @include my-display(space-between);
            margin: 20px 0;
            @include my-svg(#ccc, 20px, 20px);
            div {
                @include my-display();
            }
            svg {
                margin-right: 5px;
            }
            .entry {
                height: 20px;
                display: flex;
                align-items: center;
                color: #aaa;
                span {
                    height: 100%;
                    line-height: 24px;
                }
            }
            .dot {
                height: 20px;
                line-height: 20px;
                padding: 0 20px;
                color: #eee;
            }
        }
        .introduction {
            margin: 10px 0;
            p {
                height: 250px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    transition: all 0.5s;
                }
            }
        }
        .content-item-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    .item-wrap:hover {
        .introduction {
            p {
                overflow: hidden;
                img {
                    transform: scale(1.1);
                    transition: all 0.5s;
                }
            }
        }
    }
    .not-data {
        @include my-display();
        height: calc(100vh - 180px);
    }
}
</style>
