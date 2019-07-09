const fs = require('fs')

module.exports = (app)=>{
    // console.log(5)
    // console.log(fs.readFileSync)
    // console.log(__dirname)
    // console.log(fs.readFileSync(__dirname))
    fs.readdirSync(__dirname).forEach(file=>{
        if(file==='index.js') return
        const route = require(`./${file}`)
        app.use(route.routes()).use(route.allowedMethods())
    })
}