/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');

interface RedirectUrl {
    protocol: string;
    host: string;
    uri: string;
}

interface SignInUrlConfig {
    appId: string;
    appNamespace: string;
    redirectUrl: RedirectUrl;
    url?: string;
    scope?: string;
}

function signInUrl(config:SignInUrlConfig):string {

    assert.equal(typeof config, 'object', 'required argument config must be an object');

    config.url = config.url || 'https://www.facebook.com/dialog/oauth';
    config.scope = config.scope || 'public_profile,email';

    let redirectUrl:string = `${config.redirectUrl.protocol}${config.redirectUrl.host}${config.redirectUrl.uri}`;

    return `${config.url}?scope=${config.scope}&client_id=${config.appId}&redirect_uri=${redirectUrl}`;
}

export = signInUrl;
