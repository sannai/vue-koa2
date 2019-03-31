<template>
    <main>
        <div class="artcle-details">
            <div class="left">
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
                <div class="comment">
                    <div class="title">
                        <h3>评论</h3>
                        <p>共{{commentLength}}条</p>
                    </div>
                    <div class="content">
                        <ul class="comment-box">
                            <li v-for="item in commentList" :key="item.id">
                                <div class="lately-list">
                                    <div>
                                        <h4 class="comment-name">{{item.commentName}}</h4>
                                        <p class="comment-content">{{item.commentContent}}</p>
                                    </div>
                                    <p class="reply" @click="handleReply(item)">回复</p>
                                </div>
                                <ul class="comment-children">
                                    <li v-for="t in item.children" :key="t.id">
                                        <div class="lately-children">
                                            <div>
                                                <h4 class="comment-name">{{t.commentName}}</h4>
                                                <p class="comment-content">
                                                    <strong class="comment-name">{{t.replyName}}</strong>
                                                    {{t.commentContent}}
                                                </p>
                                            </div>
                                            <p class="reply" @click="handleReply(t)">回复</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <el-form label-width="60px">
                    <el-form-item label="名字">
                        <el-input type="text" ref="input" v-model="commentValue.commentName" placeholder="昵称" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="回复" v-if="isReply">
                        <el-input type="text" v-model="replyName" :disabled="true" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input type="textarea" v-model="commentValue.commentContent" placeholder="正文" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right;">
                        <el-button size="mini" v-if="isReply" @click="hnadlePublishComment('取消')">取消</el-button>
                        <el-button size="mini" @click="hnadlePublishComment('发表')">发表</el-button>
                    </el-form-item>
                </el-form>
            </div>
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
export default {
    data() {
        return {
            artcleDetails: [],
            latelyComment: [
                {
                    id: 1,
                    name: "刘备",
                    content: "我是皇帝",
                    createTime: "2019-1-20"
                },
                {
                    id: 2,
                    name: "诸葛亮",
                    content:
                        "我是丞相,志当存高远，鞠躬尽瘁死而后已，政治家、军事家、啦啦啦啦啦啦啦啦啦啦啦",
                    createTime: "2019-1-20"
                },
                {
                    id: 3,
                    name: "关羽",
                    content: "我是战神",
                    createTime: "2019-1-20"
                },
                {
                    id: 4,
                    name: "张飞",
                    content: "我是万人敌"
                },
                {
                    id: 5,
                    name: "赵云",
                    content: "我是一身胆",
                    createTime: "2019-1-21"
                }
            ],
            commentValue: {
                commentName: "",
                commentContent: "",
                commentPid: ""
            },
            isCommentValue: {
                commentName: "",
                commentContent: ""
            },
            isReply: false,
            replyName: "",
            commentList: [],
            commentLength: 0
        };
    },
    created() {
        //文章详情
        getArtcleDetails(this, this.$route.params.id);
        //文章评论
        getComment(this, this.$route.params.id);
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
        //验证
        checkForm() {
            let isOk = true;
            if (this.commentValue.commentName === "") {
                this.isCommentValue.commentName = "不能为空";
                isOk = false;
            } else if (this.commentValue.commentName.length > 10) {
                this.isCommentValue.commentName = "1 到 10 位数字";
                isOk = false;
            } else {
                this.isCommentValue.commentName = "";
            }

            if (this.commentValue.commentContent === "") {
                this.isCommentValue.commentContent = "不能为空";
                isOk = false;
            } else if (this.commentValue.commentContent.length > 50) {
                this.isCommentValue.commentContent = "1 到 50 位数字";
                isOk = false;
            } else {
                this.isCommentValue.commentContent = "";
            }
            return isOk;
        },
        //评论数据转换
        translateDataToTree(data) {
            this.commentLength = data[0].content.length;
            if (data[0].content.length > 0) {
                //没有父节点的数据
                let parents = data[0].content.filter(
                    value =>
                        // console.log(value.commentPid,1)
                        value.commentPid === undefined ||
                        value.commentPid === null
                );

                //有父节点的数据
                let children = data[0].content.filter(
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
                return this.commentList;
            }
        },
        //发表评论
        hnadlePublishComment(text) {
            let textArr = ["取消", "发表"];
            let data = {
                commentName: this.commentValue.commentName,
                commentContent: this.commentValue.commentContent
            };
            if (text === "取消") {
                this.isReply = false;
                this.commentValue.commentPid = "";
            } else if (text === "发表") {
                if (this.isReply) {
                    data.replyName = this.replyName;
                    data.commentPid = this.commentValue.commentPid;
                    data.commentContent = data.commentContent;
                    postAddComment(this, this.artcleDetails[0]._id, data);
                } else {
                    postAddComment(this, this.artcleDetails[0]._id, data);
                }
            }
            this.commentValue = {};
        },
        //回复
        handleReply(item) {
            this.isReply = true;
            this.$refs["input"].focus();
            if (item.commentPid) {
                this.commentValue.commentPid = item.commentPid;
            } else {
                this.commentValue.commentPid = item._id;
            }
            this.replyName = "@" + item.commentName;
        }
    },
    components: {
        SidebarLeft,
        SidebarRight,
        BackToTop
    }
};
</script>

<style lang="scss">
@import "../../scss/my-element.scss";
.artcle-details {
    width: 1040px;
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
