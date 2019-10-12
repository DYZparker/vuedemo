import { getStudentList, addStudent, delStudent } from '@/api/content'
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
                getStudentList(payload.page, payload.size, payload.search).then(response => {
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
        },
        AddStudent({commit}, payload) {
            return new Promise((resolve, reject) => {
                addStudent(payload).then(response => {
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
        },
        // GetStudent({commit}, searchData) {
        //     return new Promise((resolve, reject) => {
        //         getStudent(searchData).then(response => {
        //             if(response.status === 200) {
        //                 const res = response.data
        //                 if(res.flag) {
        //                     commit(SET_STUDENT, {student: res.student, total: res.total})
        //                 }
        //                 resolve(response)
        //             }
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },
        // SetStudent({commit}, payload) {
        //     return new Promise((resolve, reject) => {
        //         setStudent(payload.searchId, payload.student).then(response => {
        //             if(response.status === 200) {
        //                 const res = response.data
        //                 if(res.flag) {
        //                     commit(SET_STUDENT, {student: res.student, total: res.total})
        //                 }
        //                 resolve(response)
        //             }
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },
        DelStudent(context, searchId) {
            return new Promise((resolve, reject) => {
                delStudent(searchId).then(response => {
                    if(response.status === 200) {
                        resolve(response)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

    }
}

export default student