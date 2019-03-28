<template>
    <div>
        <section class="comment">
            <header class="title">
                <h3>{{title}}</h3>
                <p>共{{commentListPage.total}}条</p>
            </header>
            <div class="content">
                <ul class="comment-box" v-if="commentList.length > 0">
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
                <p v-else class="no-data">
                    暂无数据
                </p>
            </div>
            <footer class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="commentListPage.page" :page-sizes="[10, 20]" :page-size="10" background layout="total,  prev, pager, next, jumper" :total="commentListPage.total"></el-pagination>
            </footer>
        </section>
        <el-form label-width="60px">
            <el-form-item label="名字" :error="isCommentValue.commentName">
                <el-input type="text" ref="input" v-model="commentValue.commentName" placeholder="昵称" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="回复" v-show="isReply">
                <el-input type="text" v-model="replyName" :disabled="true" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="内容" :error="isCommentValue.commentContent">
                <el-input type="textarea" v-model="commentValue.commentContent" placeholder="正文" size="mini"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;">
                <el-button size="mini" v-if="isReply" @click="handlePublishComment('取消')">取消</el-button>
                <el-button size="mini" @click="handlePublishComment('发表')">发表</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
export default {
    props: {
        commentList: {
            type: Array
        },
        commentListPage: {
            type: Object
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            commentValue: {
                commentName: "",
                commentContent: "",
                commentPid: "",
                hierarchy: 1
            },
            isCommentValue: {
                commentName: "",
                commentContent: ""
            },
            isReply: false,
            replyName: ""
        };
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
        handleCurrentChange(val) {
            this.$emit("handleCurrentChange", val);
        },
        //发表评论
        handlePublishComment(text) {
            let data = {
                commentName: this.commentValue.commentName,
                commentContent: this.commentValue.commentContent,
                hierarchy: this.commentValue.hierarchy,
                count: 0
            };
            if (text === "取消") {
                this.isReply = false;
                this.commentValue.commentPid = "";
                this.commentValue.hierarchy = 1;
            } else if (text === "发表") {
                if (this.checkForm()) {
                    if (this.isReply) {
                        data.replyName = this.replyName;
                        data.commentPid = this.commentValue.commentPid;
                        data.commentContent = data.commentContent;
                        this.$emit("handleAddMessageBoard", data);
                    } else {
                        this.$emit("handleAddMessageBoard", data);
                    }
                    this.commentValue = {
                        commentName: "",
                        commentContent: "",
                        commentPid: "",
                        hierarchy: 1
                    };
                }
            }
        },
        //回复
        handleReply(item) {
            this.isReply = true;
            this.$refs["input"].focus();
            this.commentValue.hierarchy = 2;
            if (item.commentPid) {
                this.commentValue.commentPid = item.commentPid;
            } else {
                this.commentValue.commentPid = item._id;
            }
            this.replyName = "@" + item.commentName;
        }
    }
};
</script>

<style lang="scss">
@import "../../scss/my-element.scss";
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
        .no-data {
            text-align: center;
            height: 60px;
            line-height: 60px;
        }
    }
    .pagination {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
