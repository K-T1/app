import axios from 'axios'

import configs from '@configs/index'

export default {
  async register(registerDetail) {
    const { data: user } = await axios.post(`${configs.API_URL}/users/register`, registerDetail)
    return user
  },
  async login(uid) {
    const { data: user } = await axios.post(`${configs.API_URL}/users/login`, {
      uid
    })
    return user
  },
  async getUser(uid) {
    const { data: user } = await axios.get(`${configs.API_URL}/users/${uid}`)
    return user
  }
}