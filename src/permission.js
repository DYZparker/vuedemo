import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import { REMOVE_USER } from '@/store/mutation_types'


router.beforeEach((to, from, next) => {
    //判断跳转页是否需要权限验证
    if (to.meta.requiresAuth) {
        //如果需要权限，从localStorage获取token
        const token = getToken()
        if(!token) {
            //没有则返回登录页
            store.commit(REMOVE_USER)
            next('/login')
        } else {
            //token过期返回登录页
            store.dispatch('GetUserInfo').then(response => {
                if(response.status === 200) next()
            }).catch(error => {
                if(error) next('/login')
            })
        }
    } else {
        next()
    }
})