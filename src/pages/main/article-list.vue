<template>
    <main class="articde-main">
        <header class="header">
            <router-link to="/add-article">
                <el-button type="primary" icon="el-icon-plus">新增文章</el-button>
            </router-link>&emsp;
            <el-input placeholder="请输入内容" v-model="input5" class="input-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
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
                        <ul>
                            <li v-for="(item, index) in scope.row.knowledge" :key="index">
                                <el-tag>
                                    {{item.name}}
                                </el-tag>
                            </li>
                        </ul>
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
    </main>
</template>

<script>
import { getArticleList, postDeletArticle } from "@/api/main";
export default {
    data() {
        return {
            articleList: [],
            article: {},
            input5: ""
        };
    },
    created() {
        let data = {
            page: 1,
            limit: 10
        };
        getArticleList(this, data);
    },
    methods: {
        handleFunct(text, row) {
            if (text === "删除") {
                this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        postDeletArticle(this, row._id);
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
            } else if (text === "编辑") {
                this.$router.push({
                    name: "article-edit",
                    params: {
                        id: row._id
                    }
                });
                console.log(row, 66);
            }
        }
    }
};
</script>

<style lang="scss">
.articde-main {
    box-sizing: border-box;
    width: 1170px;
    margin: 20px auto;
    height: calc(100vh - 180px);
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
    }
}
</style>
