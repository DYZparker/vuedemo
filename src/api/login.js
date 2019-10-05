import request from '../utils/request'

export function login (username, password){
    return request({
        url: '/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function regist(username, password) {
    return request({
        url: '/regist',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getUserInfo (){
    return request({
        url: '/user/info',
        method: 'get'
    })
}