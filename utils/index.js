
var util = (function() {
    'use strict';

    function _getUser(usersData, requestedUser) {
        const obj = usersData.find(o => o.username === requestedUser)
        return obj
    }

    function _getUserProfile(usersProfle, useruuid) {
        const obj = usersProfle.find(o => o.userUid === useruuid)
        return obj
    }

    function _getAge(dateString) {
        dateString = dateString.substr(0, 4)+"-"+dateString.substr(8, 2)+"-"+dateString.substr(5, 2);
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function isEmpty(str) {
        return (!str || /^\s*$/.test(str));
    }

    function isRegisteredUser(usersData, requestedUser) {
        const user = _getUser(usersData, requestedUser)
        if(!user) {
            return false
        }

        return true
    }

    function isUserUnderAge(usersData, usersProfile, userid) {
        const user = _getUser(usersData, userid)
        const userProfile = _getUserProfile(usersProfile,user.uid)

        if(_getAge(userProfile.birthdate) > 9) {
            return false
        }

        return true
    }

    function getProfile(usersData, usersProfile, userid) {
        const user = _getUser(usersData, userid)
        const userProfile = _getUserProfile(usersProfile,user.uid)
        
        return userProfile
    }

    return {
      isEmpty: isEmpty,
      isRegisteredUser: isRegisteredUser,
      isUserUnderAge: isUserUnderAge,
      getProfile: getProfile
    };
  })();
  
  module.exports = util;
