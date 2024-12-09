<template>
    <div id="app">
        <div id="topmsg" v-show="$store.state.err.length > 0">
            {{ $store.state.err }}
        </div>
        <div style="display: flex; justify-content: space-between">
            <p></p>
            <h2 align="center">学生成绩管理 Mark5, Vue2.5</h2>
            <div style="color: darkmagenta; text-align: left;
                     border-bottom: 1px solid orangered; height: 20px;">
            </div>
        </div>
        <ul style="display: flex; justify-content: space-between; list-style: none;">
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>姓名: {{ $store.state.name }}</li>
            <li>角色: {{ $store.state.roleName }}</li>
            <li>
                <div style="width: 4vw; height: 4vw; margin-top: -3vw;">
                    <img v-bind:src="`${imgurl}/api/public/showimg/${$store.state.pic}`" style="width: 100%; height: 100%">
                </div>
            </li>
            <li>
                <a href="#" v-on:click="logout()">退出</a>
            </li>
        </ul>
        <hr>
        <!-- 公用 DIV 区域，显示路由组件 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
      return{
        imgurl: "http://localhost:9000"
      }
    },
    name: 'app',
    components: {},
    methods: {
        logout() {
            window.localStorage.setItem("token", "");
            window.localStorage.setItem("name", "");
            window.localStorage.setItem("roleName", "");
            window.localStorage.setItem("pic", "");
            this.$router.push("/login");
        },

    },
    created() {
        console.log("App.created");
        setInterval(() => {
            this.$store.state.errTime = this.$store.state.errTime - 1;
            if (this.$store.state.errTime <= 0) {
                this.$store.state.err = "";
            }
        }, 1000);
    },
    mounted() {
        console.log("App.vue-mounted");
        this.$store.state.token = window.localStorage.getItem("token");
        this.$store.state.roleName = window.localStorage.getItem("roleName");
        this.$store.state.name = window.localStorage.getItem("name");
        this.$store.state.pic = window.localStorage.getItem("pic");
    }
}
</script>

<style>
#topmsg {
    position: absolute;
    z-index: 999;
    left: 50vw;
    top: -4px;
    opacity: 0.7 !important;
    min-width: 300px;
    text-align: center;
    background-color: azure;
    border: 2px #2C3E50 solid;
    color: crimson;
    box-shadow: 3px 3px 3px #aaa;
}

#app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 90vh;
    height: 100%;
    z-index: 0;
}
</style>
