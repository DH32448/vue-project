<template>
    <div>
        <!-- 登录 -->
        <div style="min-height: 500px; width: 40%; border: 2px blue solid;">
            <div style="margin-left: 2%; width: 90%">
                <h3 align="center">登录</h3>
                <table width="90%" border="1" cellspacing="0" style="line-height: 36px">
                    <tr>
                        <td>手机号:</td>
                        <td><input type='text' v-model='user.username'></td>
                    </tr>
                    <tr>
                        <td>密码:</td>
                        <td><input type='password' v-model='user.password'></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type='button' value='登录' v-on:click="login()"></td>
                    </tr>
                </table>
                <h4>{{ err }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            user: {},
            err: ''
        }
    },
    methods: {
        login() {
            var that = this;
            this.$postx("/api/login", this.user).then(function(resp) {
                console.log(resp.data);
                that.$store.commit("show", resp.data.msg);
                console.log("token=" + resp.data.data.token);
                window.localStorage.setItem("token", resp.data.data.token);

                // 接下来发出一个请求，获取用户信息
                that.$get("/api/user/info").then(function(resp) {
                    console.log(resp.data);
                    window.localStorage.setItem("role", resp.data.data.role);
                    window.localStorage.setItem("name", resp.data.data.uname);
                    window.localStorage.setItem("pic", resp.data.data.pic);
                    that.$store.state.name = resp.data.data.uname;
                    that.$store.state.pic = resp.data.data.pic;

                    if (resp.data.data.role == 'adm') {
                        that.$store.state.roleName = "教务处";
                        that.$router.push("/adm");
                    } else if (resp.data.data.role == 'tea') {
                        that.$store.state.roleName = "教师";
                        that.$router.push("/tea");
                    } else if (resp.data.data.role == 'stu') {
                        that.$store.state.roleName = "学生";
                        that.$router.push("/stu");
                    }

                    window.localStorage.setItem("roleName", that.$store.state.roleName);
                }).catch(function(error) {
                    console.error("获取用户信息失败:", error);
                    that.err = "获取用户信息失败，请重试";
                });
            }).catch(function(error) {
                console.error("登录失败:", error);
                that.err = "登录失败，请检查用户名和密码";
            });
        }
    }
}
</script>

<style scoped>
/* 你可以在这里添加特定于这个组件的样式 */
</style>
