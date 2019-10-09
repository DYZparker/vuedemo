import request from '../utils/request'

// export function getStudent() {
//     return request({
//         url: '/student',
//         method: 'get'
//     })
// }

export function getStudentList(page, size) {
    return request({
        url: `/student/list`,
        method: 'post',
        data: {
            page,
            size
        }
    })
}