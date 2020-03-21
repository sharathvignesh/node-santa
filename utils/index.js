
var util = (function() {
    'use strict';

    function getUser(usersData, requestedUser) {
        let obj = usersData.find(o => o.username === requestedUser)
        return obj
    }

    function getUserProfile(usersProfle, useruuid) {
        let obj = usersProfle.find(o => o.userUid === useruuid)
        return obj
    }

    function getAge(dateString) {
        dateString = dateString.substr(0, 4)+"-"+dateString.substr(8, 2)+"-"+dateString.substr(5, 2);
        console.log(dateString)
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function isEmpty(str) {
        return (!str || /^\s*$/.test(str));
    }

    function isRegisteredUser(usersData, requestedUser) {
        const user = getUser(usersData, requestedUser)
        if(!user) {
            return false
        }

        return true
    }

    function isUserUnderAge(usersData, usersProfile, userid) {
        const user = getUser(usersData, userid)
        const userProfile = getUserProfile(usersProfile,user.uid)

        console.log(getAge(userProfile.birthdate))
        if(getAge(userProfile.birthdate) > 9) {
            return false
        }

        return true
    }

    return {
      isEmpty: isEmpty,
      isRegisteredUser: isRegisteredUser,
      isUserUnderAge: isUserUnderAge
    };
  })();
  
  module.exports = util;
