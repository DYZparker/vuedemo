import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import student from './modules/student'


Vue.use(Vuex)

const store = new Vuex.Store ({
    modules: {
        user,
        student
    }
}) 

export default store