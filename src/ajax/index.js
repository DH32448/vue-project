import axios from "axios";
import qs from "qs";
import store from "../store/index.js";
import router from "../router/index.js";

let token = '';
axios.defaults.withCredentials = false;
axios.defaults.headers.common['Authorization'] = token;

var instance = axios.create({
    baseURL: 'http://localhost:9000'
});

// 添加一个请求拦截器，自动读取 localStorage 的 JWT Token，并带到 SpringBoot
instance.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('token');
        console.log("每次请求前读取 Token=" + token);
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// HTTP 响应拦截器
instance.interceptors.response.use(
    response => {
        console.log("成功 拦截1:" + response.status);
        return response;
    },
    error => {
        console.log("error 拦截1:" + error.response.status);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log("error 拦截2:" + error.response.status);
                    store.commit("show", "账号或密码有误....");
                    localStorage.setItem('token', "");
                    router.push('/login'); // 跳转登录
                    break;
                case 403: // 禁止访问, 没有权限
                    store.commit("show", "禁止访问, 没有权限-403....");
                    break;
                default:
                    store.commit("show", "操作失败 ...");
            }
        }
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
);

// GET 请求，键值对
// url: /api/adm/clz/findPage    obj： {start: 3, pagenum: 10}
export let $get = (url, obj) => {
    return instance.get(
        url,
        { params: obj }
    );
};

// POST 请求，键值对(key-value) Body  x-www-formed
// url: /api/adm/clz/add    obj： {clzno: 'K01', clzname: 'Java'}
export let $postx = function(url, obj) {
    // 把 obj 转成键值对
    let kv = qs.stringify(obj);
    console.log("postx=" + kv);
    return instance.post(
        url,
        kv, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
            }
        }
    );
};

// POST 请求，JSON Body  application/json
// url: /api/adm/clz/add    obj： {clzno: 'K01', clzname: 'Java'}
export let $postj = function(url, obj) {
    // 把 obj 转成键值对
    console.log("postj=" + obj);
    return instance.post(
        url,
        obj, {
            headers: {
                'Content-Type': 'application/json;charset=utf8'
            }
        }
    );
};

// POST 请求，文件 Body  multipart/form-data
// url: /api/adm/stu/add 带图片   FormData 键值对
export let $postf = function(url, formData) {
    // 把 obj 转成键值对
    console.log("postf=" + formData);
    return instance.post(
        url,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
};
