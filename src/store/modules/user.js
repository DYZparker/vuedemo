import { setToken, setUser, removeUser } from '@/utils/auth'
import { login, getUserInfo} from '@/api/login'
import { SET_TOKEN, SET_USER, REMOVE_USER } from '../mutation_types'

const user = {
    state: {
        token: '',
        user: ''
    },

    mutations: {
        [SET_TOKEN](state, token) {
            state.token = token,
            setToken(token)
        },

        [SET_USER](state, user) {
            state.user = user,
            setUser(user)
        },

        [REMOVE_USER](state) {
            state.token = '',
            state.user = '',
            removeUser(user)
        }
    },

    actions: {
        //登录成功则将返回的token、用户信息存入localStorage和vuex
        Login({commit}, payload) {
            return new Promise((resolve, reject) => {
                login(payload.username, payload.password).then(response => {
                    const res = response.data
                    if(res.err_code === 0) {
                        commit(SET_TOKEN, res.token)
                        commit(SET_USER, res.user)
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        //主要判断token是否过期，如过期则清除token和user
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    resolve(response)
                }).catch(error => {
                    if(error.response.status === 401) {
                        commit('REMOVE_USER')
                    }
                    reject(error)
                })
            })
        },


    },
}

export default user