<template>
    <div style="height: 80vh;">
        <div style="display: flex; justify-content: space-between;">
            <h3>班级管理</h3>
            <h4>当前状态: {{ actmsg[actidx] }}</h4>
            <h4><button v-on:click="go2Add()">添加新班级</button></h4>
        </div>
        <div style="display: flex">
            <div style="width: 67%; border: red 1px solid">
                <table border="1" style="width: 95%">
                    <tr v-for="e in clzs" :key="e.clzno">
                        <td>{{ e.clzno }}</td>
                        <td>{{ e.clzname }}</td>
                        <td><button v-on:click="go2Update(e)">修改</button></td>
                        <td><button v-on:click="del(e.clzno)">删除</button></td>
                    </tr>
                </table>
            </div>
            <div style="width: 32%; border: blue 1px solid">
                班级编号: <input type="text" v-model="formClz.clzno" v-bind:readonly="actidx != 1">
                <hr>
                班级名称: <input type="text" v-model="formClz.clzname">
                <hr>
                <button v-on:click="doUpdate()" v-show="actidx == 0">修改</button>
                <button v-on:click="doAdd()" v-show="actidx == 1">添加</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdmClz",
        data() {
            return {
                clzs: [],
                formClz: {},
                actmsg: ['修改', '添加', '显示'],
                actidx: 2 // 0 显示修改    1  显示添加
            }
        },
        methods: {
            del(clzno) {
                console.log("删除的编号 : " + clzno);
                var that = this; // 此时this指向vm
                this.$get("/api/adm/clz/remove/" + clzno)
                    .then(function(resp) {
                        console.log(resp.data);
                        that.clzs = resp.data.data;
                    });
            },

            go2Update(e) {
                console.log(e);
                var that = this;
                that.actidx = 0;
                this.$get("/api/adm/clz/findOne/" + e.clzno)
                    .then(function(resp) {
                        console.log(resp.data);
                        that.formClz = resp.data.data;
                    });
            },

            doUpdate() {
                var that = this;
                this.$postx("/api/adm/clz/update", that.formClz)
                    .then(function(resp) {
                        that.$store.commit("show", resp.status + ": " + resp.data.msg);
                        console.log(resp.data);
                        that.clzs = resp.data.data;
                    });
            },

            go2Add() {
                this.actidx = 1;
                this.formClz = {};
            },

            doAdd() {
                var that = this;
                this.$postx("/api/adm/clz/add", that.formClz)
                    .then(function(resp) {
                        that.$store.commit("show", resp.status + ": " + resp.data.msg);
                        console.log(resp.data);
                        that.clzs = resp.data.data;
                    });
            },
        },  // methods 结束
        mounted() {
            var that = this;
            this.$get("/api/public/getClzs")
                .then(function(resp) {
                    console.log(resp.data);
                    that.clzs = resp.data.data;
                });
        }
    }
</script>

<style>
    /* 可以在这里添加样式 */
</style>
