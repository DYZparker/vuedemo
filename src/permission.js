import router from './router'
import { getToken, setUser, removeUser } from './utils/auth'
import { getUserInfo } from './api/login'


router.beforeEach((to, from, next) => {
    //判断跳转页是否需要权限验证
    if (to.meta.requiresAuth) {
        //如果需要权限，从localStorage获取token
        const token = getToken()
        if(!token) {
            //没有则返回登录页
            removeUser()
            next('/login')
        } else {
            //有则请求获取用户信息，改变登录状态
            getUserInfo().then(
                response => {
                    //向localStorage和vuex更新用户信息
                    setUser(response.data)
                    next()
                }).catch(err => {
                    //token过期返回登录页
                    if(err.response.status === 401) {
                        return next('/login')
                    }
                })
        }
    } else {
        next()
    }
})