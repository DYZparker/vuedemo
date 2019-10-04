import router from './router'
import { getToken, setToken, getUser, setUser, removeUser } from './utils/auth'
import { getUserInfo } from './api/login'


router.beforeEach((to, from, next) => {
    //判断跳转页是否需要权限验证
    if (to.mate.requireAuth) {
        //如果需要权限，从vuex获取token
        const token = getToken()
        if(!token) {
            //没有则返回登录页
            removeUser()
            next('/login')
        } else {
            //有则请求获取用户信息，改变登录状态
            getUserInfo(token).then(
                response => {
                    //向localStorage和vuex存入用户信息
                    setUser(response.username)
                    next()
                }
            )

        }
    } else {
        next()
    }
})