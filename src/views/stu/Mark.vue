<template>
    <div style="height: 80vh;">
        <h3>我的分数表</h3>
        <hr>
        <div>
            <table width="90%" border="1" cellspacing="0">
                <tr>
                    <th>学生编号</th>
                    <th>学生姓名</th>
                    <th>班级编号</th>
                    <th>班级名称</th>
                    <th>课程编号</th>
                    <th>课程名称</th>
                    <th>课程成绩</th>
                    <th>录入时间</th>
                </tr>
                <tr v-for="e in marks" :key="e.id">
                    <td>{{ e.user.uid }}</td>
                    <td>{{ e.user.uname }}</td>
                    <td>{{ e.user.clz.clzno }}</td>
                    <td>{{ e.user.clz.clzname }}</td>
                    <td>{{ e.course.cno }}</td>
                    <td>{{ e.course.cname }}</td>
                    <td><span style="font-weight: 700;">{{ e.score }}</span></td>
                    <td>{{ e.tpost | fmtDate('yyyy-M-d') }}</td>
                </tr>
            </table>
            <p style="text-align: end; color: blue;">写个 Vue 的过滤器 filter 去格式化日期</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "StuMark",
    data() {
        return {
            marks: []
        };
    },
    methods: {
        // 可以在这里添加其他方法
    },
    filters: {
        fmtDate: function(value, args) {
            var dt = new Date(value);
            if (args == 'yyyy-M-d') { // yyyy-M-d
                let year = dt.getFullYear();
                let month = dt.getMonth() + 1;
                let date = dt.getDate();
                return `${year}-${month}-${date}`;
            }
        }
    },
    mounted() {
        this.$get("/api/fore/stu/findMyMark")
            .then((resp) => {
                console.log(resp.data.data);
                this.marks = resp.data.data;
            })
            .catch((error) => {
                console.error("Error fetching marks:", error);
            });
    }
};
</script>

<style scoped>
/* 你可以在这里添加特定于这个组件的样式 */
</style>
