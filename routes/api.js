const express = require('express');
const router = new express.Router();
const axios = require('axios');

const util = require('../utils')
const mail = require('../utils/mail')
const queue = require('../utils/queue')

const {isEmpty, isRegisteredUser, isUserUnderAge, getProfile} = util

router.post('/', async (request, response,) => {
    const {body: {userid, wish}} = request

    // simple form validation
    if(isEmpty(userid) || isEmpty(wish)) {
        request.flash('error', 'userid or wish cannot be empty')
        response.redirect('/error')
        response.send(400)
    }

    const {data: usersData} = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');
    // check if user is registered
    if(!isRegisteredUser(usersData, userid)) {
        request.flash('error', 'user not registered')
        response.redirect('/error')
        response.send(400)
    }

    const {data: usersProfile} = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');
    // check if user is under 10
    if(!isUserUnderAge(usersData, usersProfile, userid)) {
        request.flash('error', 'user should be less than 10 years old')
        response.redirect('/error')
        response.send(400)
    }

    const profile = getProfile(usersData, usersProfile, userid)
    const content = `${userid} <br /> ${profile.address} <br /> ${wish}`

    queue.addMessage(content)

    request.flash('success', 'wish successfully sent to santa !!!')
    response.redirect('/success')
    response.send(200)
});

function intervalFunc() {
    mail.send()
}

setInterval(intervalFunc, 15000);

module.exports = router;
