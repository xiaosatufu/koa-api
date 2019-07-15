const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/questions' })
const { secret } = require('../config')

const { find, findById, create, update, delete: del } = require('../controllers/questions')
const { checkQuestionExist, checkQuestioner } = require('../controllers/questions')
//鉴权
const auth = jwt({ secret })


router.get('/', find)

router.post('/', auth, create)

router.get('/:id', checkQuestionExist, findById)

router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update)

router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del)

// router.get('/:id/followers', checkQuestionExist, listFollowers)


module.exports = router