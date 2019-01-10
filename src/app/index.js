const router = require('express').Router();
const {
    StatusCode
} = require('./../shared/enums/status-code');

router.get('/blacklist', 
    (req, res) => res.status(StatusCode.Success).render('blacklist'));
    
module.exports = router;