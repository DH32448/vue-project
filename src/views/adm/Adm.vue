<template>
    <div style="height: 80vh; display: flex; border: blue 1px solid">
        <!-- menu -->
        <div style="width: 20%; height: 100%; padding-left: 1%;">
            <div style="border-bottom: 2px solid blue; width: 90%;">
                <h4>后台管理菜单</h4>
            </div>
            <ul style="list-style: none; line-height: 30px;">
                <li><router-link to="/adm/clz" active-class="active">班级管理</router-link></li>
                <li><router-link to="/adm/course" active-class="active">课程管理</router-link></li>
                <li><router-link to="/adm/tea" active-class="active">教师管理</router-link></li>
                <li><router-link to="/adm/stu" active-class="active">学生管理</router-link></li>
                <li><router-link to="/adm/task" active-class="active">教学安排</router-link></li>
                <li><router-link to="/adm/head" active-class="active">更新头像</router-link></li>
            </ul>
        </div>
        <div style="width: 78%; height: 100%;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Adm',
        data() {
            return {
            }
        }
    }
</script>

<style>
    .active { background: lightblue; }
</style>
