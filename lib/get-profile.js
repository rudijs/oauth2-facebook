/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
var Q = require('q');
var FB = require('fb');
function getProfile(token) {
    assert.equal(typeof token, 'string', 'required argument token must be a string');
    var deferred = Q.defer();
    FB.api('me', {
        fields: ['id', 'name', 'first_name', 'last_name', 'email', 'gender', 'timezone', 'link', 'locale'],
        access_token: token
    }, function (res) {
        if (!res) {
            deferred.reject('getProfile/me error occurred');
        }
        else if (res.email) {
            deferred.resolve(res);
        }
        else if (res.error && res.error.message) {
            deferred.reject(res.error.message);
        }
        else {
            deferred.reject(res);
        }
    });
    return deferred.promise;
}
module.exports = getProfile;
