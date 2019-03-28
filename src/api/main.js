/************** main-首页 **********************/

import Http from '@/utils/http';

//文章-列表
const getArticleList = (that) => {
    Http({
        method: 'get',
        url: '/index'
    }, (response) => {
        that.articleList = response.data.message;
    }, (error) => {
    });
};

//文章-详情
const getArtcleDetails = (that, id) => {
    Http({
        method: 'get',
        url: `/index/article-details/${id}`
    }, (response) => {
        that.article = response.data.message[0];
    }, (error) => {
    });
};

//评论-详情
const getComment = (that, id, data) => {
    Http({
        method: 'get',
        url: `/index/article-details/comment/${id}`,
        params: data
    }, (response) => {
        that.translateDataToTree(response.data.message);
    }, (error) => {
        console.log(err);
    });
};

//文章-添加
const postAddArticle = (that, data) => {
    Http({
        method: 'post',
        url: `/index/add-article`,
        params: data
    }, (response) => {
    }, (error) => {
    });
};

//文章-删除
const postDeletArticle = (that, id) => {
    Http({
        method: 'post',
        url: `/index/delete-article/${id}`
    }, (response) => {
        getArticleList(that);
    }, (error) => {
    });
};

//评论-添加
const postAddComment = (that, id, data, page) => {
    Http({
        method: 'post',
        url: `/index/add-comment/${id}`,
        params: data
    }, (response) => {
        let datas = {
            page,
            limit: 10
        };
        getComment(that, id, datas);
    }, (error) => {
    });
};

//标签-添加
const postAddLabel = (that, data) => {
    Http({
        method: 'post',
        url: `/index/add-label`,
        params: data
    }, (response) => {
    }, (error) => {
    });
};

//七牛云
const getIndexToken = (that) => {
    Http({
        method: 'get',
        url: `/index/token`
    }, (response) => {
        that.qiniuForm.token = response.data.uploadToken;
    }, (error) => {
    });
};

export {
    getArticleList,
    getArtcleDetails,
    getComment,
    postAddArticle,
    postDeletArticle,
    postAddComment,
    postAddLabel,
    getIndexToken
};