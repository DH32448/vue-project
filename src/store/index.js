import { createApp } from 'vue';
import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: '',       // token
        name: '',        // 全局姓名
        pic: '',         // 全局图片
        roleName: '',    // 全局角色
        err: '',
        errTime: 0,
        pagenum: 1,
        goods: {}        // 全局变量
    },
    getters: {  // 全局计算属性
        // 获取商品总价：
        totalPrice: state => {
            let totalPrice = 0;
            Object.values(state.goods).forEach(v => {
                totalPrice += v.num * v.price;
            });
            return totalPrice;
        }
    },
    mutations: {
        show(state, msg) {
            state.errTime = 4;
            state.err = "提示:" + msg;
        }
    }
});

export default store;
