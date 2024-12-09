<template>
    <div style="height: 80vh; border: blue 1px solid">
        <h3>登分管理 - 课程选择</h3>
        <hr>
        <div>
            <table width="90%" border="1">
                <tbody>
                    <tr>
                        <th>班级编号</th>
                        <th>班级名称</th>
                        <th>课程号</th>
                        <th>课程名称</th>
                        <th>请选择</th>
                    </tr>
                    <tr v-for="t in tasks" :key="t.clz.clzno + t.course.cno">
                        <td><span>{{ t.clz.clzno }}</span></td>
                        <td><span>{{ t.clz.clzname }}</span></td>
                        <td><span>{{ t.course.cno }}</span></td>
                        <td><span>{{ t.course.cname }}</span></td>
                        <td>
                            <button v-on:click="go2Add(t.clz.clzno, t.course.cno)">
                                该班级学生进行登分或修改
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "TeaGoTask",
    data() {
        return {
            tasks: []
        };
    },
    methods: {
        go2Add(clzno, cno) {
            console.log("go2Add=clzno" + clzno + "   cno=" + cno);
            this.$router.push({
                path: '/tea/domark',
                query: {
                    clzno: clzno,
                    cno: cno
                }
            });
        }
    },
    mounted() {
        this.$get("/api/fore/tea/findMyTask")
            .then((resp) => {
                console.log(resp.data.data);
                this.tasks = resp.data.data;
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }
};
</script>

<style scoped>
/* 你可以在这里添加特定于这个组件的样式 */
</style>
