import axios from 'axios'

import configs from '@configs/index'

const USER_API_URL = `${configs.API_URL}/users`

export default {
  async register(registerDetail) {
    const { data: user } = await axios.post(`${USER_API_URL}/register`, registerDetail)
    return user
  },
  async login(uid) {
    const { data: user } = await axios.post(`${USER_API_URL}/login`, {
      uid
    })
    return user
  },
  async getUser(uid) {
    const { data: user } = await axios.get(`${USER_API_URL}/${uid}`)
    return user
  },
  async validteRegister(registerDetail) {
    const { data: user } = await axios.post(`${USER_API_URL}/register/validate`, registerDetail)
    return user
  },
  async fetchCurrentUser() {
    const { data: user } = await axios.get(`${USER_API_URL}/current`)
    return user
  }
}
