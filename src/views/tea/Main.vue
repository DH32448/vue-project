<template>
    <div style="height: 100%; display: flex; border: blue 1px solid">
        <!-- menu -->
        <div style="width: 20%; height: 100%;">
            <div style="border-bottom: 2px solid darkcyan; width: 90%;">
                <h4>教师菜单</h4>
            </div>
            <ul style="list-style: none; line-height: 30px;">
                <li><router-link to="/tea/pwd" active-class="active">修改密码</router-link></li>
                <li><router-link to="/tea/head" active-class="active">更改头像</router-link></li>
                <li><router-link to="/tea/mark" active-class="active">登分管理</router-link></li>
            </ul>
        </div>
        <div style="width: 78%; height: 100%;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tea'
}
</script>

<style scoped>
/* 你可以在这里添加特定于这个组件的样式 */
</style>
