const Koa = require('koa')
const bodyBody = require('koa-body')
const koaStatic = require('koa-static')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const path = require('path')
const app = new Koa()
const routing = require('./routes')
const {connectionStr} = require('./config')

mongoose.connect(connectionStr,{ useNewUrlParser: true },()=>{
    console.log('MongoDB连接成功')
})
mongoose.connection.on('error',console.error)

app.use(koaStatic(path.join(__dirname,'public')))

app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}))

// app.use(async (ctx, next) => {
//     try {
//         await next()
//     } catch (err) {
//         ctx.status = err.status || err.statusCode || 500
//         ctx.body = {
//             message: err.message
//         }
//     }
// })


app.use(bodyBody({
    multipart:true,//启用文件
    formidable:{
        uploadDir:path.join(__dirname,'/public/uploads'),
        keepExtensions:true
    }
})) 
app.use(parameter(app))
routing(app)

app.listen(3001, () => {
    console.log('程序启动在3000端口')
})