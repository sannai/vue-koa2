import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/main';
import ArtcleDetails from '@/pages/main/artcle-details';
import AddArticle from '@/pages/main/add-article';
import ChatIndex from '@/pages/chatroom';
import MessageBoard from '@/pages/message-board';
import Classify from '@/pages/classify';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'main',
            component: Main
        },
        {
            path: '/artcle-details/:id',
            name: 'artcle-details',
            component: ArtcleDetails
        },
        {
            path: '/add-article',
            name: 'add-article',
            component: AddArticle
        },
        {
            path: '/classify',
            name: 'classify',
            component: Classify
        },
        {
            path: '/message-board',
            name: 'messageBoard',
            component: MessageBoard
        },
        {
            path: '/chat',
            name: 'chat',
            component: ChatIndex
        }
        
    ]
});