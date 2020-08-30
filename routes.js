const { Router } = require('express')
const router = Router()

router.get('/about', (req, res) => {
    res.sendFile('about.html', {root : __dirname + '/public'})
})

module.exports = router;