/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
var Q = require('q');
var FB = require('fb');
function getAccessToken(config, code) {
    assert.equal(typeof config, 'object', 'required argument config must be an object');
    assert.equal(typeof code, 'string', 'required argument code must be a string');
    var deferred = Q.defer();
    var redirectUrl = "" + config.redirectUrl.protocol + config.redirectUrl.host + config.redirectUrl.uri;
    FB.api('oauth/access_token', {
        client_id: config.appId,
        client_secret: config.appSecret,
        redirect_uri: redirectUrl,
        code: code
    }, function (res) {
        if (!res) {
            deferred.reject('oauth/access_token error occurred');
        }
        else if (res.access_token && res.expires) {
            deferred.resolve({
                accessToken: res.access_token,
                expires: res.expires
            });
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
module.exports = getAccessToken;
