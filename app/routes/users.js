const jsonwebtoken = require('jsonwebtoken')
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { secret } = require('../config')

const { find, findById, create, update, delete: del, login, checkOwner } = require('../controllers/users')

//鉴权
const auth = async (ctx, next) => {
    //获取anthorization
    const { authorization = '' } = ctx.request.header;
    //处理authorization 获取token
    const token = authorization.replace('Bearer ', '')
    //验证token
    try {
        const user = jsonwebtoken.verify(token, secret)
        ctx.state.user = user
    } catch (err) {
        ctx.throw(401, err.message)
    }
    await next()
}

console.log(find)
router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/:id', auth, checkOwner, update)
router.delete('/:id', auth, checkOwner, del)
router.post('/login', login)
module.exports = router