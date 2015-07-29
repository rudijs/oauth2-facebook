/// <reference path="../typings/tsd.d.ts" />
'use strict';

import chai = require('chai');

var should = chai.should();

import signInUrl = require('./sign-in-url');

describe('oauth2-facebook', () => {

    describe('sign-in-url', () => {

        var config = {
            appId: 'abc123',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/facebook/callback'
            }
        };

        it('should return a valid facebook sign in url', () => {
            signInUrl(config).should.equal('https://www.facebook.com/dialog/oauth?scope=public_profile,email&client_id=abc123&redirect_uri=http://example.com/auth/facebook/callback');
        });

    });

});
