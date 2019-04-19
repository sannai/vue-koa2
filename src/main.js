// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import store from "./store";
import App from "./App";
import router from "./router";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.snow.css";
import socketio from "./socket";
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;
Vue.prototype.$sockets = socketio;
new Vue({
    el: "#app",
    router,
    store,
    components: {
        App
    },
    template: "<App/>"
});