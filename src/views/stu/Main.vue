<template>
    <div style="height: 100%; display: flex; border: blue 1px solid">
        <!-- menu -->
        <div style="width: 20%; height: 100%;">
            <div style="border-bottom: 2px solid darkkhaki; width: 90%;">
                <h4>学生菜单</h4>
            </div>

            <ul style="list-style: none; line-height: 30px;">
                <li><router-link to="/stu/pwd" active-class="active">修改密码</router-link></li>
                <li><router-link to="/stu/head" active-class="active">更改头像</router-link></li>
                <li><router-link to="/stu/course" active-class="active">我的课程</router-link></li>
                <li><router-link to="/stu/mark" active-class="active">我的分数</router-link></li>
            </ul>
        </div>
        <div style="width: 78%; height: 100%;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Main'
    }
</script>

<style scoped>
/* 你可以在这里添加特定于这个组件的样式 */
</style>
