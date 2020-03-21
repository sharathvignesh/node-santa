const express = require('express');
const router = new express.Router();
const axios = require('axios');

const util = require('../utils')

const {isEmpty, isRegisteredUser, isUserUnderAge} = util

router.post('/', async (request, response,) => {
    const {body: {userid, wish}} = request

    // simple form validation
    if(isEmpty(userid) || isEmpty(wish)) {
        request.flash('error', 'userid or wish cannot be empty')
        response.redirect('/error')
    }

    const {data: usersData} = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');
    // check if user is registered
    if(!isRegisteredUser(usersData, userid)) {
        request.flash('error', 'user not registered')
        response.redirect('/error')
    }

    const {data: usersProfile} = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');
    // check if user is under 10
    if(!isUserUnderAge(usersData, usersProfile, userid)) {
        request.flash('error', 'user should be less than 10 years old')
        response.redirect('/error')
    }
    response.redirect('/success')
});

module.exports = router;
