const state = {
    articleList: [],
    articleListPage: {},
    isSelect: true
};
const getters = {

};

const actions = {};

const mutations = {
    handleArticleList(state, payload) {
        state.articleList = payload.data;
        state.articleListPage = payload.page;
    },
    handleIsSelect(state, payload) {
        state.isSelect = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};