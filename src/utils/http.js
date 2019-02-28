import Axios from "axios";
const qs = require("qs");
let imgUrl = "http://localhost:3000/";
let apiUrl = "http://localhost:3000/";
let routerMode = "hash";
if (process.env.NODE_ENV === "production") {
    imgUrl = "http://zzp96.cn";
    apiUrl = "http://47.107.115.117:3000";
}
const instance = Axios.create({
    baseURL: apiUrl
});
instance.interceptors.request.use(
    config => {
        if(config.method !== 'get') {
            config.data = qs.stringify(config.params);
            delete config.params;
        }
        return config;
    }
);

export default (data = {}, success = response => { }, error = error => { }) => {
    instance(data)
        .then(success)
        .catch(error);
};