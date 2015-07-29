/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
function signInUrl(config) {
    assert.equal(typeof config, 'object', 'required argument config must be an object');
    config.url = config.url || 'https://www.facebook.com/dialog/oauth';
    config.scope = config.scope || 'public_profile,email';
    var redirectUrl = "" + config.redirectUrl.protocol + config.redirectUrl.host + config.redirectUrl.uri;
    return config.url + "?scope=" + config.scope + "&client_id=" + config.appId + "&redirect_uri=" + redirectUrl;
}
module.exports = signInUrl;
