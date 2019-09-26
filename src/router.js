import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Layout from '@/components/Layout.vue'
import Home from './views/home'



Vue.use(Router);

export default new Router({
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
                }
            ]
        }
    ]
})