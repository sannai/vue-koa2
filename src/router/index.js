import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/main';
import SidebarLeft from '@/pages/main/sidebar-left';
import ArtcleDetail from '@/pages/main/artcle-detail';
import AddArticle from '@/pages/main/add-article';
import Article from '@/pages/main/article';
import ArticleList from '@/pages/main/article-list';
import ChatIndex from '@/pages/chatroom';
import MessageBoard from '@/pages/message-board';
import Classify from '@/pages/classify';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main,
            children: [
                {
                    path: '',
                    name: 'index',
                    component: SidebarLeft
                },
                {
                    path: 'article/:id',
                    name: 'ArtcleDetail',
                    component: ArtcleDetail
                }
            ]
        },
        {
            path: '/message-board',
            name: 'MessageBoard',
            component: MessageBoard
        },
        {
            path: '/article',
            component: Article,
            children: [
                {
                    path: '',
                    name: 'ArticleList',
                    component: ArticleList
                },
                {
                    path: 'add',
                    name: 'ArticleAdd',
                    component: AddArticle
                }, {
                    path: 'edit/:id',
                    name: 'ArticleEdit',
                    component: AddArticle
                }
            ]
        }
    ]
});