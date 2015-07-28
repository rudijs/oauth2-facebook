/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');

interface signInUrlConfig {
    appId: string;
    appNamespace: string;
    redirectUri: string;
    url?: string;
    scope?: string;
}

function signInUrl(config:signInUrlConfig):string {

    assert.equal(typeof config, 'object', 'required argument config must be an object');

    config.url = config.url || 'https://www.facebook.com/dialog/oauth';
    config.scope = config.scope || 'public_profile,email';

    return `${config.url}?scope=${config.scope}&client_id=${config.appId}`;
}

export = signInUrl;
