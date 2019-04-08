const state = {
    count: 0,
    articleList: [],
    articleListPage: {}
};
const getters = {

};

const actions = {};

const mutations = {
    handleArticleList(state, payload) {
        state.articleList = payload.data;
        state.articleListPage = payload.page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};