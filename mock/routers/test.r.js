const jsonServer = require('json-server')
const router = jsonServer.router('test.db.json')

router.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

router.get('/list', (req, res) => {
    res.jsonp(router.db.get('test').value())
})


module.exports = router;