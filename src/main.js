// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';
import socketio from './socket';
import {
    container,
    header,
    main,
    footer,
    Button,
    Select,
    Row,
    Col,
    menu,
    menuItem,
    submenu,
    input,
    card,
    rate,
    tag,
    upload,
    dialog,
    form,
    formItem,
    pagination,
    Message
} from "element-ui";
Vue.use(VueQuillEditor)
    .use(Button)
    .use(container)
    .use(header)
    .use(main)
    .use(footer)
    .use(Row)
    .use(Col)
    .use(menu)
    .use(menuItem)
    .use(submenu)
    .use(Select)
    .use(input)
    .use(card)
    .use(rate)
    .use(tag)
    .use(upload)
    .use(form)
    .use(formItem)
    .use(pagination)
    .use(dialog);

Vue.config.productionTip = false;
Vue.prototype.$sockets = socketio;
Vue.prototype.$message = Message;
new Vue({
    el: "#app",
    router,
    components: {
        App
    },
    template: "<App/>"
});
