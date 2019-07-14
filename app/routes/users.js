const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { secret } = require('../config')

const { find, findById, create, update, delete: del, login, checkOwner, listFollowing, follow, unfollow, listFollowers } = require('../controllers/users')

//鉴权
const auth = jwt({ secret })

console.log(find)
console.log(auth)

router.get('/', find)

router.post('/', create)

router.get('/:id', findById)

router.patch('/:id', auth, checkOwner, update)

router.delete('/:id', auth, checkOwner, del)

router.post('/login', login)

router.get('/:id/following', listFollowing)
router.get('/:id/followers', listFollowers)

// router.put('/following/:id',auth,follow)
router.put('/following/:id', auth, follow)
router.delete('/following/:id', auth, unfollow)



module.exports = router