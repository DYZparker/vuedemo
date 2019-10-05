import { getToken, setToken, setUser, getUser, removeUser } from '@/utils/auth'
import { login, getUserInfo} from '@/api/login'

const user = {
    state: {
        user: getUser()
    },

    mutations: {

    },

    actions: {

    },
}

export default user