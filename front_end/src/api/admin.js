import { axios } from '@/utils/request'
const api = {
    adminPre: '/api/admin'
}
export function getManagerListAPI(){
    return axios({
        url: `${api.adminPre}/getAllManagers`,
        method: 'POST'
    })
}
export function getClientListAPI() {
    return axios({
        url: `${api.adminPre}/getAllClients`,
        method: 'POST'
    })
}
export function getSalesmanListAPI(){
    return axios({
        url: `${api.adminPre}/getAllSalesman`,
        method: 'POST',
    })
}
export function addManagerAPI(data) {
    return axios({
        url: `${api.adminPre}/addManager`,
        method: 'POST',
        data
    })
}
export function addSalesmanAPI(data) {
    return axios({
        url: `${api.adminPre}/addSalesman`,
        method: 'POST',
        data
    })
}
export function deleteUserAPI(param) {
    return axios({
        url: `${api.adminPre}/${param.userId}/deleteUser`,
        method: 'POST',
    })
}