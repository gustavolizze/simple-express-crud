const router = require('express').Router();

require('./blacklist/blacklist-controller')(router);

module.exports = router;