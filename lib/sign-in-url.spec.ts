/// <reference path="../typings/tsd.d.ts" />
'use strict';

import chai = require('chai');

let should:any = chai.should();

import signInUrl = require('./sign-in-url');

describe('oauth2-facebook', () => {

    describe('sign-in-url', () => {

        let config:any = {
            appId: 'abc123',
            appNamespace: 'exampleapp',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/facebook/callback'
            }
        };

        it('should return a valid facebook sign in url', () => {
            should.exist(signInUrl);
            signInUrl(config).should.equal('https://www.facebook.com/dialog/oauth?scope=public_profile,email' +
                '&client_id=abc123&redirect_uri=http://example.com/auth/facebook/callback');
        });

    });

});
