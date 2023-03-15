const jwt = require('jsonwebtoken')
const secret = 'SLDLKKDS323ssdd@#@@gf'
// 需要登录验证的链接
const AUTH_URL = ['/api/user_info']

const create = (userInfo) => {
  // 5 小时有效期
  const token = jwt.sign(userInfo, secret, { expiresIn: 5 * 60 * 60 })
  return token
}

const parse = (token) => {
  if (token) {
    try {
      return jwt.verify(token, secret)
    } catch (e) {
      return null
    }
  }
  return null
}

const isAuthURL = (path) => {
  return AUTH_URL.includes(path)
}

const isAuthorized = (req) => {
  if (!isAuthURL(req.path)) {
    return true
  }
  const token = req.headers['x-token']
  const result = parse(token)
  console.log('==========', req.headers['x-token'], result)
  if (result && result.username) {
    return true
  }
  return false
}

module.exports = {
  create,
  isAuthorized,
  parse,
}
