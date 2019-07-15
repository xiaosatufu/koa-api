const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/questions/:questionId/answers' })
const { secret } = require('../config')

const { find, findById, create, update, delete: del } = require('../controllers/questions')
const { checkAnswerExist, checkAnswerer } = require('../controllers/answers')
//鉴权
const auth = jwt({ secret })


router.get('/', find)

router.post('/', auth, create)

router.get('/:id', checkAnswerExist, findById)

router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update)

router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del)

// router.get('/:id/followers', checkQuestionExist, listFollowers)


module.exports = router