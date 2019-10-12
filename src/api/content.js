import request from '../utils/request'

export function getStudentList(page, size, search) {
    return request({
        url: `/student/list`,
        method: 'post',
        data: {
            page,
            size,
            search
        }
    })
}

export function addStudent(student) {
    return request({
        url: `/student/add`,
        method: 'post',
        data: {
            student
        }
    })
}

// export function getStudent(searchData) {
//     return request({
//         url: `/student/search`,
//         method: 'post',
//         data: {
//             searchData
//         }
//     })
// }

// export function setStudent(searchId, student) {
//     return request({
//         url: `/student`,
//         method: 'put',
//         data: {
//             searchId,
//             student
//         }
//     })
// }

export function delStudent(searchId) {
    return request({
        url: `/student/delete`,
        method: 'delete',
        data: {
            searchId
        }
    })
}