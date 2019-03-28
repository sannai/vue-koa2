import Http from '@/utils/http';

//文章-列表
const getArticleList = (that, data) => {
    Http({
        method: 'get',
        url: 'artice-list/index',
        params: data
    }, (response) => {
        that.articleList = response.data.message;
    }, (error) => {
    });
};

export {
    getArticleList
};