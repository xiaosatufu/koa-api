class HomeCtl {
    index(ctx) {
        ctx.body = 'home page'
    }
    upload(ctx) {
        const file = ctx.request.files.file
        ctx.body = { path: file.path }
    }
}

module.exports = new HomeCtl()