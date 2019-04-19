import Vue from 'vue';
import Router from 'vue-router';

//首页
import Home from '@/pages/home';
import Main from '@/pages/main';
import SidebarLeft from '@/pages/main/sidebar-left';
import ArtcleDetail from '@/pages/main/artcle-detail';
import ArticleView from '@/pages/main/article-view';

//留言
import Message from '@/pages/message';
//列表
import ArticleList from '@/pages/artice-list';
import AddArticle from '@/pages/artice-list/new-article';

//关于我
import About from '@/pages/about';

//404
import CantFind from '@/pages/404';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Home,
        children: [{
                path: '',
                redirect: "/index",
                component: Main
            },
            {
                path: 'index',
                name: 'index',
                component: Main,
                meta: {
                    title: "首页"
                }
            },
            {
                path: 'article',
                component: ArticleView,
                children: [{
                        path: '',
                        name: 'Article',
                        meta: {
                            title: "文章"
                        },
                        component: SidebarLeft
                    },
                    {
                        path: ':id',
                        name: 'ArtcleDetail',
                        component: ArtcleDetail,
                        meta: {
                            title: "文章详情"
                        }
                    }
                ]
            },
            {
                path: '/message',
                name: 'Message',
                component: Message,
                meta: {
                    title: "留言"
                }
            },
            {
                path: '/articles',
                component: Home,
                children: [{
                        path: '',
                        name: 'ArticleList',
                        component: ArticleList,
                        meta: {
                            title: "文章列表"
                        }
                    },
                    {
                        path: 'add',
                        name: 'ArticleAdd',
                        component: AddArticle,
                        meta: {
                            title: "文章添加"
                        }
                    }, {
                        path: 'edit/:id',
                        name: 'ArticleEdit',
                        component: AddArticle,
                        meta: {
                            title: "文章编辑"
                        }
                    }
                ]
            },
            {
                path: '/about',
                name: 'About',
                component: About,
                meta: {
                    title: "关于"
                }
            },
            {
                path: '*',
                name: '404',
                component: CantFind,
                meta: {
                    title: "404"
                }
            }
        ]
    }]
});

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} | 牵着蜗牛去旅行`;
    }
    next();
});

export default router;