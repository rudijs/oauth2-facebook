/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');
import uuid = require('uuid');

interface RedirectUrl {
    protocol: string;
    host: string;
    uri: string;
}

interface SignInUrlConfig {
    appId: string;
    redirectUrl: RedirectUrl;
    url?: string;
    scope?: string;
}

function signIn(config:SignInUrlConfig):any {

    assert.equal(typeof config, 'object', 'required argument config must be an object');

    config.url = config.url || 'https://www.facebook.com/dialog/oauth';
    config.scope = config.scope || 'public_profile,email';

    let state:string = uuid.v4();

    let redirectUrl:string = `${config.redirectUrl.protocol}${config.redirectUrl.host}${config.redirectUrl.uri}&state=${state}`;

    return {
        url: `${config.url}?scope=${config.scope}&client_id=${config.appId}&redirect_uri=${redirectUrl}`,
        state: state
    };
}

export = signIn;
