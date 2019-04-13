import Vue from 'vue';
import Router from 'vue-router';

//首页
import Main from '@/pages/main';
import SidebarLeft from '@/pages/main/sidebar-left';
import ArtcleDetail from '@/pages/main/artcle-detail';
import ArticleView from '@/pages/main/article-view';

//留言
import Message from '@/pages/message';
//列表
import ArticleList from '@/pages/artice-list';
import AddArticle from '@/pages/artice-list/new-article';
import ArticleViewList from '@/pages/artice-list/article-view';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: Main
        },
        {
            path: '/index',
            component: ArticleView,
            children: [{
                    path: '',
                    name: 'idx',
                    component: SidebarLeft
                },
                {
                    path: 'artcle-detail/:id',
                    name: 'ArtcleDetail',
                    component: ArtcleDetail
                }
            ]
        },
        {
            path: '/message',
            name: 'Message',
            component: Message
        },
        {
            path: '/article',
            component: ArticleViewList,
            children: [{
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