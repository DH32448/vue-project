<template>
    <div style="height: 80vh; border: blue 1px solid">
        <h3>教务处-教学安排</h3>
        <hr>
        <div style="display: flex; justify-content: space-between;">
            <div style="width: 67%; border: red 1px solid">
                <h3>已有的教学安排</h3>
                <table border="1" style="width: 95%">
                    <tr v-for="e in tasks" :key="e.kid">
                        <td>{{ e.user.uid }}</td>
                        <td>{{ e.user.uname }}</td>
                        <td>{{ e.clz.clzno }}</td>
                        <td>{{ e.clz.clzname }}</td>
                        <td>{{ e.course.cno }}</td>
                        <td>{{ e.course.cname }}</td>
                        <td><button v-on:click="del(e.kid)">删除</button></td>
                    </tr>
                </table>
            </div>
            <div style="width: 32%; border: blue 1px solid">
                <h3>添加新的课程安排</h3>
                教师:
                <select v-model="formTask.user.uid">
                    <option v-for="tea in teas" :value="tea.uid" :selected="formTask.user.uid == tea.uid">
                        {{ tea.uname }}
                    </option>
                </select>
                <hr>
                班级:
                <select v-model="formTask.clz.clzno">
                    <option v-for="clz in clzs" :value="clz.clzno" :selected="formTask.clz.clzno == clz.clzno">
                        {{ clz.clzname }}
                    </option>
                </select>
                <hr>
                课程:
                <select v-model="formTask.course.cno">
                    <option v-for="course in courses" :value="course.cno" :selected="formTask.course.cno == course.cno">
                        {{ course.cname }}
                    </option>
                </select>
                <hr>
                <button v-on:click="add()">添加</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdmTask",
        data() {
            return {
                clzs: [],
                courses: [],
                teas: [],
                formTask: {
                    user: {},
                    clz: {},
                    course: {}
                },
                tasks: []
            }
        },
        methods: {
            del(kid) {
                this.$get("/api/adm/task/del/" + kid).then((resp) => {
                    console.log(resp.data);
                    this.tasks = resp.data.data;
                });
            }, // del

            add() {
                this.$postj("/api/adm/task/add", this.formTask).then((resp) => {
                    console.log(resp.data);
                    this.tasks = resp.data.data;
                });
            } // add
        }, // methods

        mounted() {
            this.$get("/api/adm/task/findAll").then((resp) => {
                console.log(resp.data.data);
                this.tasks = resp.data.data;
            });

            this.$get("/api/public/getClzs").then((resp) => {
                console.log(resp.data.data);
                this.clzs = resp.data.data;
            });

            this.$get("/api/public/getCourses").then((resp) => {
                console.log(resp.data.data);
                this.courses = resp.data.data;
            });

            this.$get("/api/public/getTeachers").then((resp) => {
                console.log(resp.data.data);
                this.teas = resp.data.data;
            });
        } // mounted
    }
</script>

<style scoped>
/* 你可以在这里添加特定于这个组件的样式 */
</style>
