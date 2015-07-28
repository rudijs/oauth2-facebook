/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
function signInUrl(config) {
    assert.equal(typeof config, 'object', 'required argument config must be an object');
    config.url = config.url || 'https://www.fb.com/oauth2/authorization';
    return config.url;
}
module.exports = signInUrl;
//# sourceMappingURL=sign-in-url.js.map