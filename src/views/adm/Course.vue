<template>
    <div style="height: 80vh;">
        <div style="display: flex; justify-content: space-between;">
            <h3>课程管理</h3>
            <p></p>
            <h4><button v-on:click="go2Add()">添加新课程</button></h4>
            <p></p>
        </div>
        <hr>
        <div style="position: relative;">
            <div id="inputwin" v-show="bShow">
                <hr>
                <h4>课程 - {{ actmsg[actidx] }}</h4>
                <hr>
                <table width="80%" align="center" border="1" cellspacing="0" style="line-height: 35px;">
                    <tr>
                        <td>课程编号</td>
                        <td><input type="text" v-model="formObj.cno" v-bind:readonly="actidx == 0" /></td>
                    </tr>
                    <tr>
                        <td>课程名称</td>
                        <td><input type="text" v-model="formObj.cname" /></td>
                    </tr>
                </table>
                <hr>
                <div style="display: flex; justify-content: space-between;">
                    <p>&nbsp;</p>
                    <p><button v-on:click="bShow = false;">取消</button></p>
                    <p><button v-on:click="save()">保存</button></p>
                    <p>&nbsp;</p>
                </div>
            </div> <!-- inputwin -->
            <div>
                <div style="width: 90%; border: red 1px solid">
                    <table border="1" style="width: 95%">
                        <tr v-for="e in courses" :key="e.cno">
                            <td>{{ e.cno }}</td>
                            <td>{{ e.cname }}</td>
                            <td><button v-on:click="go2Update(e)">修改</button></td>
                            <td><button v-on:click="del(e.clzno)">删除</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdmCourse",
        data() {
            return {
                formObj: {},
                courses: [],
                bShow: false,
                actmsg: ['修改', '添加', '显示'],
                actidx: 2 // 0 显示修改    1  显示添加
            }
        },
        methods: {
            go2Add() {
                this.actidx = 1;
                this.formObj = {};
                this.bShow = true;
            },
            go2Update(e) {
                console.log(e);
                var that = this;
                that.actidx = 0;
                this.bShow = true;
                this.$get("/api/adm/course/findOne/" + e.cno)
                    .then(function(resp) {
                        console.log(resp.data);
                        that.formObj = resp.data.data;
                    });
            },
            save() {
                var that = this;
                let url = "/api/adm/course/add";
                if (this.actidx == 0) {
                    url = "/api/adm/course/update";
                }
                this.$postj(url, that.formObj)
                    .then(function(resp) {
                        that.bShow = false;
                        that.$store.commit("show", resp.status + ":" + resp.data.msg);
                        console.log(resp.data);
                        that.courses = resp.data.data;
                    });
            },
            del(clzno) {
                console.log("删除的编号 : " + clzno);
                var that = this; // 此时this指向vm
                this.$get("/api/adm/course/remove/" + clzno)
                    .then(function(resp) {
                        console.log(resp.data);
                        that.courses = resp.data.data;
                    });
            }
        },
        mounted() {
            var that = this;
            this.$get("/api/adm/course/findAll")
                .then(function(resp) {
                    console.log(resp.data);
                    that.courses = resp.data.data;
                });
        }
    }
</script>

<style scoped>
    #inputwin {
        border: 5px solid #2C3E50;
        position: absolute;
        z-index: 900;
        width: 40%;
        min-height: 15vw;
        left: 20%;
        top: 1vw;
        opacity: 0.9 !important;
        background-color: azure;
        color: #2C3E50;
        box-shadow: 3px 3px 3px #aaa;
    }
    #inputwin input {
        line-height: 27px;
        border-radius: 8px;
        width: 80%;
    }
</style>
