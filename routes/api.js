const express = require('express');
const router = new express.Router();

const util = require('../utils')

const {isEmpty} = util

router.post('/', (request, response,) => {
    const {body: {userid, wish}} = request
    if(isEmpty(userid) || isEmpty(wish)) {
        request.flash('error', 'userid or wish cannot be empty')
        response.redirect('/error')
    }

    response.redirect('/success')
});

module.exports = router;
