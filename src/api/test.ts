import axios from './base'

export const fetchTest = () => {
  return axios.get('/basic-api/getMenuList')
}