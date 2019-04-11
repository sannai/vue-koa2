<template>
    <main class="articde-main">
        <header class="header">
            <!-- <router-link to="/add-article"> -->
            <el-button type="primary" icon="el-icon-plus" @click="handleFunct('添加')">新增文章</el-button>&emsp;
            <!-- </router-link>&emsp; -->
            <!-- <el-input placeholder="请输入内容" v-model="keyWord" class="input-select">
                <el-button slot="append" icon="el-icon-search" @click="handleSelect"></el-button>
            </el-input> -->
        </header>
        <section class="section">
            <el-table :data="articleList" border>
                <el-table-column label="标题" align="center">
                    <template slot-scope="scope">
                        <div v-html="scope.row.title"></div>
                    </template>
                </el-table-column>

                <el-table-column label="类型" width="180" align="center">
                    <template slot-scope="scope">
                        <my-tag v-for="(item, index) in scope.row.knowledge" :key="index">{{item.name}}</my-tag>
                    </template>
                </el-table-column>
                <el-table-column label="留言(条)" width="180" align="center">
                    <template slot-scope="scope">
                        <div v-html="scope.row.commentNumber"></div>
                    </template>
                </el-table-column>
                <el-table-column label="创建日期" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.createDate.substring(0, 10) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleFunct('编辑', scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleFunct('删除', scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <footer class="footer">
            <el-pagination @current-change="handleCurrentChange" :current-page="articleListPage.page" :page-sizes="[10, 20]" :page-size="10" background layout="total,  prev, pager, next, jumper" :total="articleListPage.total"></el-pagination>
        </footer>
    </main>
</template>

<script>
import { mapState } from "vuex";
import { getArticleList, deleteDeletArticle } from "@/api/main";
import MyTag from "@/components/my-tag";
export default {
    data() {
        return {
            article: {}
        };
    },
    created() {
        let data = {
            page: 1,
            limit: 10
        };
        getArticleList(this, data);
    },
    computed: {
        ...mapState({
            articleList: state => state.main.articleList,
            articleListPage: state => state.main.articleListPage
        })
    },
    methods: {
        handleCurrentChange(val) {
            let data = {
                page: val,
                limit: 10
            };
            getArticleList(this, data);
        },
        handleFunct(text, row) {
            if (text === "删除") {
                this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        deleteDeletArticle(this, row._id);
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            } else if (text === "添加") {
                this.$router.push({
                    name: "ArticleAdd",
                    query: {
                        text: "添加"
                    }
                });
            } else if (text === "编辑") {
                this.$router.push({
                    name: "ArticleEdit",
                    params: {
                        id: row._id
                    },
                    query: {
                        text: "编辑"
                    }
                });
            }
        }
    },
    components: {
        MyTag
    }
};
</script>

<style lang="scss">
.articde-main {
    box-sizing: border-box;
    width: 1040px;
    margin: 20px auto;
    min-height: calc(100vh - 170px);
    background-color: #fff;
    padding: 20px;
    .header {
        display: flex;
        margin-bottom: 20px;
        .input-select {
            width: 250px;
        }
    }
    .section {
        min-height: calc(100vh - 320px);
    }
    .footer {
        text-align: center;
    }
}
</style>
