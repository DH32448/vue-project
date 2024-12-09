import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 一级别组件
import App from '../App.vue'
import Adm from '../views/adm/Adm.vue'
import Stu from '../views/stu/Main.vue'
import Tea from '../views/tea/Main.vue'
import Login from '../views/Login.vue'   // 登录

// 二级别组件
import Adm_Clz from '../views/adm/Clz.vue'
import Adm_Course from '../views/adm/Course.vue'
import Adm_Task from '../views/adm/Task.vue'    // 教学安排页面
import Adm_Head from '../views/adm/Head.vue'
import Adm_Tea_Show from '../views/adm/tea/Show.vue'   // 教师列表显示
import Adm_Tea_Add from '../views/adm/tea/Add.vue'     // 切换到教师添加或修改页面
import Adm_Stu_Show from '../views/adm/stu/Show.vue'   // 学生列表显示
import Adm_Stu_Add from '../views/adm/stu/Add.vue'   // 学生列表显示
// fore/tea
import Tea_Mark_Go from '../views/tea/GoMark.vue'  // 登分课程选择页面
import Tea_Mark_Do from '../views/tea/DoMark.vue'  // 切换到登分页面
import Tea_Head from '../views/tea/Head.vue'  // 头像
import Tea_Pwd from '../views/tea/Pwd.vue'  // 密码
// fore_stu
import Stu_Mark from '../views/stu/Mark.vue'  // 学生查分数页面
import Stu_Course from '../views/stu/Course.vue'  // 学生查课程页面

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login },
        { path: '/adm', component: Adm,
            children: [
                { path: 'clz', component: Adm_Clz },
                { path: 'course', component: Adm_Course },
                { path: 'tea', component: Adm_Tea_Show },
                { path: 'addtea', component: Adm_Tea_Add },
                { path: 'stu', component: Adm_Stu_Show },
                { path: 'addstu', component: Adm_Stu_Add },
                { path: 'task', component: Adm_Task },
                { path: 'head', component: Adm_Head }
            ],
        },
        { path: '/stu', component: Stu,
            children: [
                { path: 'head', component: Tea_Head },
                { path: 'pwd', component: Tea_Pwd },
                { path: 'course', component: Stu_Course },
                { path: 'mark', component: Stu_Mark }
            ]
        },
        { path: '/tea', component: Tea,
            children: [
                { path: 'mark', component: Tea_Mark_Go },
                { path: 'domark', component: Tea_Mark_Do },
                { path: 'head', component: Tea_Head },
                { path: 'pwd', component: Tea_Pwd }
            ]
        },
        { path: "/", redirect: "/login", component: App },  // 这一行放在最后匹配
    ]
})

export default router
