import Axios from "axios";
const qs = require("qs");
let apiUrl = "http://localhost:3000/";
if (process.env.NODE_ENV === "production") {
    apiUrl = "https://api.zzp96.cn";
}
const instance = Axios.create({
    baseURL: apiUrl
});
instance.interceptors.request.use(
    config => {
        if (config.method !== 'get') {
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