/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
var Q = require('q');
var FB = require('fb');
function getProfile(logger, token) {
    assert.equal(typeof logger, 'function', 'required argument logger must be a function');
    assert.equal(typeof token, 'string', 'required argument token must be a string');
    var deferred = Q.defer();
    FB.api('me', { access_token: token }, function (res) {
        if (!res.email) {
            logger(res);
            deferred.reject(Error('FB.api sign in error'));
        }
        else {
            deferred.resolve(res);
        }
    });
    return deferred.promise;
}
module.exports = getProfile;
