<template>
    <div style="height: 80vh;">
        <h3>我的课程表</h3>
        <hr>
        <div>
            <table width="90%" border="1" cellspacing="0">
                <tr>
                    <th>任课教师</th>
                    <th>任课教师</th>
                    <th>所在班级</th>
                    <th>所在班级</th>
                    <th>课程编号</th>
                    <th>课程名称</th>
                </tr>
                <tr v-for="e in tasks" :key="e.course.cno">
                    <td>{{ e.user.uid }}</td>
                    <td>{{ e.user.uname }}</td>
                    <td>{{ e.clz.clzno }}</td>
                    <td>{{ e.clz.clzname }}</td>
                    <td>{{ e.course.cno }}</td>
                    <td>{{ e.course.cname }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StuCourse",
        data() {
            return {
                tasks: []
            }
        },
        methods: {
            // 可以在这里添加其他方法
        },
        mounted() {
            this.$get("/api/fore/stu/findMyCourse")
                .then((resp) => {
                    console.log(resp.data.data);
                    this.tasks = resp.data.data;
                })
                .catch((error) => {
                    console.error("Error fetching courses:", error);
                });
        }
    }
</script>

<style scoped>
/* 你可以在这里添加特定于这个组件的样式 */
</style>
