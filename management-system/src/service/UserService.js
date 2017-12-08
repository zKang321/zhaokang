import axios from './Http'
import Qs from 'qs'
class UserService {
  async login (login) {
    let token = await axios.post('/uaa/oauth/token',
    {username: login.user, password: login.psw, grant_type: 'password', appid: 'BDM'},
    {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic d2ViX2FwcDo='}})
    this.setToken(token.data)
    return await this.getAccount()
  }
  async logout () {
    sessionStorage.clear('token')
  }
  async getAccount () {
    return axios.get('/uaa/api/account')
  }
  setToken (data) {
    sessionStorage.setItem('token', JSON.stringify(data))
  }
  resetPassword (req) {
    return axios.post('/uaa/api/account/forget_password', Qs.stringify(req))
  }
}
export default new UserService()
