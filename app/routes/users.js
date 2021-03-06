const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { secret } = require('../config')

const { find, findById, create, update, delete: del,
    login, checkOwner, listFollowing, follow, unfollow,
    listFollowers, checkUserExist,
    followTopic, unfollowTopic,listFollowingTopics,listQuestions,
    listLikingAnswers, likeAnswer, unlikeAnswer,
    listDislikingAnswers, dislikeAnswer, undislikeAnswer,
} = require('../controllers/users')

const { checkTopicExist } = require('../controllers/topics')

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
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/following/:id', auth, checkUserExist, unfollow)

router.get('/:id/followingTopics', listFollowingTopics)
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic)
router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic)
router.get('/:id/questions', listQuestions)
router.get('/:id/likingAnswers', listLikingAnswers);
router.put('/likingAnswers/:id', auth, checkAnswerExist, likeAnswer, undislikeAnswer);
router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikeAnswer);
router.get('/:id/dislikingAnswers', listDislikingAnswers);
router.put('/dislikingAnswers/:id', auth, checkAnswerExist, dislikeAnswer, unlikeAnswer);
router.delete('/dislikingAnswers/:id', auth, checkAnswerExist, undislikeAnswer);



module.exports = router