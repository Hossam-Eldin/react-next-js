//const passport = require('passport')
const isAdmin = require('../middleware/requiredAdmin')


module.exports = (app, next) => {

    app.get('/', (req, res) => {
        next.render(req, res, '/index')

    })
    app.get('/a/:id', (req, res) => {
        const actualPage = '/article'
        const queryParams = {
            title: req.params.title,
            id: req.params.id
        }
        next.render(req, res, actualPage, queryParams)
    })

    app.get('/o/:title', (req, res) => {
        const actualPage = '/section'
        const queryParams = {
            title: req.params.title
        }

        next.render(req, res, actualPage, queryParams)
    })

    /**
     * Post Page 
     */
    app.get('/p/:id', (req, res) => {
        const actualPage = '/single/post'
        const queryParams = {
            id: req.params.id
        }
        next.render(req, res, actualPage, queryParams);
    })

    /**Random routers */
    app.get('/r/:title/:name?', (req, res) => {
        const actualPage = '/single/random'
        const queryParams = {
            title: req.params.title,
            name: req.params.name
        }
        next.render(req, res, actualPage, queryParams);
    })

    /**Contact us */
    app.get('/contact-us', (req, res) => {
        next.render(req, res, '/single/contact');
    })

    /**Terms */
    app.get('/terms', (req, res) => {
        next.render(req, res, '/single/terms');
    })

    /**About */
    app.get('/about', (req, res) => {
        next.render(req, res, '/single/about');
    })
    /**privacy */
    app.get('/privacy', (req, res) => {
        next.render(req, res, '/single/privacy')
    })


    /**user  */
    app.get('/u/:uid', (req, res) => {
        const actualPage = '/single/profile';
        const queryParams = {
            uid: req.params.uid
        }
        next.render(req, res, actualPage, queryParams);
    })

    /**sections feed */

    app.get('/o/', (req, res) => {
        next.render(req, res, '/sections')
    })

    /**badge page */
    app.get('/b/:badge', (req, res) => {
        const actualPage = '/single/badge'
        const queryParams = {
            badge: req.params.badge
        }
        next.render(req, res, actualPage, queryParams);
    })
}