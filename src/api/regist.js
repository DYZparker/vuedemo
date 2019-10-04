import request from '../utils/request'

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