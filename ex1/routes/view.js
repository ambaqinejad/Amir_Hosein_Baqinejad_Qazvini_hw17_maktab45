const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    return res.sendFile(path.join(path.dirname(__dirname), 'public', 'html', 'office.html'))
});

router.get('/:officeName', (req, res, next) => {
    return res.sendFile(path.join(path.dirname(__dirname), 'public', 'html', 'employee.html'))
});

module.exports = router