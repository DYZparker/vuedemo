import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Layout from '@/components/Layout.vue'
import Home from './views/home'
import Information from './views/information'
import Achievement from './views/achievement'



Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: Home,
                    mate: {title: '首页'}
                },
                {
                    path: '/information',
                    component: Information,
                    mate: {title: '学生信息'}
                },
                {
                    path: '/achievement',
                    component: Achievement,
                    mate: {title: '学生成绩'}
                }
            ]
        }
    ]
})