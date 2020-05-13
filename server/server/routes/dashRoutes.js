//const passport = require('passport')
const isAdmin = require('../middleware/requiredAdmin')


module.exports = (app, next) => {

    const islogin = (req, res, next) => {
        if (!req.isAuthenticated()) {
            next()
        } else {
            let url = req.protocol + '://' + req.headers.host + '/dashboard';
            res.redirect(url)
        }
    }
    //login
    app.get('/cpl', (req, res) => {
        const actualPage = '/cp/login'
        next.render(req, res, actualPage);
    })

    //home page for cp
    app.get('/dashboard',isAdmin, (req, res) => {
        const actualPage = '/cp/home'
        next.render(req, res, actualPage);
    })

    //articles
    app.get('/articles/list', (req, res) => {
        next.render(req, res, '/cp/articles/list')
    })

    app.get('/articles/create', (req, res) => {
        next.render(req, res, '/cp/articles/create')
    })

    app.get('/articles/edit/:id', (req, res) => {
        const actualPage = '/cp/articles/edit'
        const queryParams = {
            id: req.params.id
        }
        next.render(req, res, actualPage, queryParams);
    })

    //posts


    app.get('/posts/create', (req, res) => {
        next.render(req, res, '/cp/posts/post')
    })

    app.get('/posts/list', (req, res) => {
        next.render(req, res, '/cp/posts/list')
    })

    app.get('/post/edit/:id', (req, res) => {
        const actualPage = '/cp/posts/edit'
        const queryParams = {
            id: req.params.id
        }
        next.render(req, res, actualPage, queryParams);
    })



    //sections
    app.get('/section/create', (req, res) => {
        next.render(req, res, '/cp/sections/create')
    })

    app.get('/section/list', (req, res) => {

        next.render(req, res, '/cp/sections/list')
    })

    app.get('/section/edit/:id', (req, res) => {
        const actualPage = '/cp/sections/edit'
        const queryParams = {
            id: req.params.id
        }
        next.render(req, res, actualPage, queryParams);
    })




    //landing page
    app.get('/landing/head', (req, res) => {
        next.render(req, res, '/cp/landing/head')
    })


    //mange the site   
    app.get('/mange/create-admin', (req, res) => {

        next.render(req, res, '/cp/mang/create-admin')
    })
    //info routes
    app.get('/mange/info', (req, res) => {
        next.render(req, res, '/cp/mang/info')
    })


    app.get('/mange/infoList', (req, res) => {
        next.render(req, res, '/cp/mang/infoList')
    })


    app.get('/info/edit/:id', (req, res) => {
        const actualPage = '/cp/mang/editInfo'
        const queryParams = {
            id: req.params.id
        }
        next.render(req, res, actualPage, queryParams);
    })

    /** Random */
    app.get('/random/add', (req, res) => {
        next.render(req, res, '/cp/random/add')
    })
    app.get('/random/list', (req,res)=>{
        next.render(req,res,'/cp/random/list')
    })
}