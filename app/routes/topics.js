const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/topics' })
const { secret } = require('../config')

const { find, findById, create, update, listFollowers, listQuestions } = require('../controllers/topics')
const { checkTopicExist } = require('../controllers/topics')
//鉴权
const auth = jwt({ secret })


router.get('/', find)

router.post('/', auth, create)

router.get('/:id', checkTopicExist, findById)

router.patch('/:id', auth, checkTopicExist, update)

router.get('/:id/followers', checkTopicExist, listFollowers)

router.get('/:id/questions', checkTopicExist, listQuestions)



module.exports = router