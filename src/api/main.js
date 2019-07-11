/************** main-首页 **********************/

import Http from "@/utils/http";

//文章-列表
const getArticleList = (that, data) => {
    Http(
        {
            method: "get",
            url: "/article/list",
            params: data,
        },
        response => {
            that.$store.commit("handleArticleList", response.data.message);
        },
        error => {}
    );
};

//文章-添加
const postAddArticle = (that, data) => {
    Http(
        {
            method: "post",
            url: `/article/add`,
            params: data,
        },
        response => {
            that.$message.success("添加成功");
        },
        error => {}
    );
};

//文章-详情
const getArtcleDetails = (that, id) => {
    Http(
        {
            method: "get",
            url: `/article/${id}`,
        },
        response => {
            that.article = response.data.message[0];
        },
        error => {}
    );
};

//文章-编辑
const putEditArticle = (that, id, data) => {
    Http(
        {
            method: "put",
            url: `/article/edit/${id}`,
            params: data,
        },
        response => {
            that.$message.success("编辑成功");
            // getArticleList(that);
        },
        error => {}
    );
};

//文章-删除
const deleteDeletArticle = (that, id) => {
    Http(
        {
            method: "delete",
            url: `/article/delete/${id}`,
        },
        response => {
            that.$message.success("删除成功");
            let data = {
                keyWord: this.keyWord,
                page: 1,
                limit: 10,
            };
            getArticleList(that, data);
        },
        error => {}
    );
};

//评论-详情
const getComment = (that, id, data) => {
    Http(
        {
            method: "get",
            url: `/article/comment/${id}`,
            params: data,
        },
        response => {
            that.translateDataToTree(response.data.message);
        },
        error => {
            console.log(err);
        }
    );
};

//评论-添加
const postAddComment = (that, id, data) => {
    Http(
        {
            method: "post",
            url: `/article/add-comment/${id}`,
            params: data,
        },
        response => {
            that.$message.success("评论成功");
            let datas = {
                page: 1,
                limit: 10,
            };
            getComment(that, id, datas);
        },
        error => {}
    );
};

//七牛云
const getIndexToken = that => {
    Http(
        {
            method: "get",
            url: `/token`,
        },
        response => {
            that.qiniuForm.token = response.data.uploadToken;
        },
        error => {}
    );
};

export {
    getArticleList,
    getArtcleDetails,
    getComment,
    postAddArticle,
    putEditArticle,
    deleteDeletArticle,
    postAddComment,
    getIndexToken,
};
