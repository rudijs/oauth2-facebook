/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
var Q = require('q');
var FB = require('fb');
function getProfile(token) {
    assert.equal(typeof token, 'string', 'required argument token must be a string');
    var deferred = Q.defer();
    FB.api('me', { access_token: token }, function (res) {
        deferred.resolve(res);
    });
    return deferred.promise;
}
module.exports = getProfile;
