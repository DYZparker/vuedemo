import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/index'
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
                    meta: {
                        title: '首页',
                        requiresAuth: true
                    }
                },
                {
                    path: '/information',
                    component: Information,
                    meta: {
                        title: '学生信息',
                        requiresAuth: true
                    }
                },
                {
                    path: '/achievement',
                    component: Achievement,
                    mate: {
                        title: '学生成绩',
                        requireAuth: true
                    }
                }
            ]
        }
    ]
})