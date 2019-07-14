const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/topics' })
const { secret } = require('../config')

const { find, findById, create, update } = require('../controllers/topics')

//鉴权
const auth = jwt({ secret })


router.get('/', find)

router.post('/',auth, create)

router.get('/:id', findById)

router.patch('/:id', auth, update)
module.exports = router