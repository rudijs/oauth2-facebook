/// <reference path="../typings/tsd.d.ts" />
'use strict';
var chai = require('chai');
var should = chai.should();
var signInUrl = require('./sign-in-url');
describe('oauth2-facebook', function () {
    describe('sign-in-url', function () {
        var config = {
            appId: 'abc123',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/facebook/callback'
            }
        };
        it('should return a valid facebook sign in url', function () {
            should.exist(signInUrl);
            signInUrl(config).should.match(/https:\/\/www\.facebook\.com\/dialog\/oauth\?scope=public_profile,email&client_id=abc123&redirect_uri=http:\/\/example.com\/auth\/facebook\/callback&state=.*/);
        });
    });
});
