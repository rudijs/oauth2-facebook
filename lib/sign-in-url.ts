/// <reference path="../typings/tsd.d.ts" />
'use strict';

var assert = require('assert');

interface signInUrlConfig {
    url?: string;
}

function signInUrl(config:signInUrlConfig):string {

    assert.equal(typeof config, 'object', 'required argument config must be an object');

    config.url = config.url || 'https://www.fb.com/oauth2/authorization';

    return config.url;
}

export = signInUrl;