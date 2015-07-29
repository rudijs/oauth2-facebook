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
        if (!res || res.error) {
            deferred.reject(!res ? 'oauth/access_token error occurred.' : res.error);
        }
        else if (!res.access_token || !res.expires) {
            deferred.reject('oauth/access_token error occurred.');
        }
        else {
            deferred.resolve({
                accessToken: res.access_token,
                expires: res.expires
            });
        }
    });
    return deferred.promise;
}
module.exports = getAccessToken;
