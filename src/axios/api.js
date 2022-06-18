import * as axios from "axios";

export function getInformation(page, sort) {
    return axios.get(`http://localhost:3001/?page=${page}&limit=10&sort=${JSON.stringify(sort)}`).then(response => { return response.data });
}
export function getCount(value, head, currentPage, sort) {
    return axios.get(`http://localhost:3001/count?value=${value}&head=${head}&page=${currentPage}&limit=10&sort=${JSON.stringify(sort)}`).then(response => { return response.data });
}
export function getDistance(value, head, currentPage, sort) {
    return axios.get(`http://localhost:3001/distance?value=${value}&head=${head}&page=${currentPage}&limit=10&sort=${JSON.stringify(sort)}`).then(response => { return response.data });
}
export function getName(value, head, currentPage, sort) {
    return axios.get(`http://localhost:3001/name?value=${value}&head=${head}&page=${currentPage}&limit=10&sort=${JSON.stringify(sort)}`).then(response => { return response.data });
}
