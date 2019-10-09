import { getStudentList } from '@/api/content'
import { SET_STUDENT } from '../mutation_types'

const student = {
    state: {
        student: [],
        total: null,
    },

    mutations: {
        [SET_STUDENT](state, data) {
            state.student = data.student
            state.total = data.total
        }
    },

    actions: {
        GetStudentList({commit}, payload) {
            return new Promise((resolve, reject) => {
                getStudentList(payload.page, payload.size).then(response => {
                    if(response.status === 200) {
                        const res = response.data
                        if(res.flag) {
                            commit(SET_STUDENT, {student: res.student, total: res.total})
                        }
                        resolve(response)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }

    }
}

export default student