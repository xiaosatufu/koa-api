const Answers = require('../models/answers')
const User = require('../models/users')
class AnswersCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1)
        ctx.body = await Answers
            .find({ content: q, questionId: ctx.params.questionId })
            .limit(perPage).skip(page * perPage)
    }
    async checkAnswerExist(ctx, next) {
        const answer = await Answers.findById(ctx.params.id).select('+answerser')
        if (!answer) {
            ctx.throw(404, '答案不存在')
        }
        if (ctx.params.questionId && answer.questionId !== ctx.params.questionId) {
            ctx.throw(404, '该问题下没有此答案')
        }
        ctx.state.answer = answer
        await next()
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
        const answer = await Answers.findById(ctx.params.id).select(selectFields).populate('answerer')
        ctx.body = answer
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true }
        })
        const answerer = ctx.state.user._id
        const { questionId } = ctx.params
        const answers = await new Answers({ ...ctx.request.body, answerer, questionId }).save()
        ctx.body = answers
    }
    async checkAnswerer(ctx, next) {
        const { answer } = ctx.state
        if (answer.answerer.toString() !== ctx.state.user._id) {
            ctx.throw(403, '没有权限')
        }
        await next()

    }
    async update(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: false }
        })
        const answer = await ctx.state.answer.update(ctx.request.body)
        ctx.body = ctx.state.answer
    }


    async delete(ctx) {
        await Answer.findByIdAndRemove(ctx.params.id)
        ctx.status = 204
    }

}

module.exports = new AnswersCtl()