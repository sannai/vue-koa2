import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/main';
import SidebarLeft from '@/pages/main/sidebar-left';
import ArtcleDetails from '@/pages/main/artcle-details';
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
            redirect: '/index'
        },
        {
            path: '',
            name: 'main',
            component: Main,
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: SidebarLeft
                },
                {
                    path: 'artcle-detail/:id',
                    name: 'artcle-detail',
                    component: ArtcleDetails
                }
            ]
        },
        {
            path: '/classify',
            name: 'classify',
            component: Classify
        },
        {
            path: '/message-board',
            name: 'message-board',
            component: MessageBoard
        },
        {
            path: '/article',
            name: 'Article',
            component: Article,
            redirect: '/article/list',
            children: [
                {
                    path: 'list',
                    name: 'article-list',
                    component: ArticleList
                },
                {
                    path: 'add',
                    name: 'article-add',
                    component: AddArticle
                }, {
                    path: 'edit/:id',
                    name: 'article-edit',
                    component: AddArticle
                }
            ]
        },
        {
            path: '/chat',
            name: 'chat',
            component: ChatIndex
        }
    ]
});