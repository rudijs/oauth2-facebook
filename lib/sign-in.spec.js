/// <reference path="../typings/tsd.d.ts" />
'use strict';
var chai = require('chai');
var should = chai.should();
var linkedinSignIn = require('./sign-in');
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
            should.exist(linkedinSignIn);
            var signin = linkedinSignIn(config);
            signin.url.should.match(/https:\/\/www\.facebook\.com\/dialog\/oauth\?scope=public_profile,email&client_id=abc123&redirect_uri=http:\/\/example.com\/auth\/facebook\/callback&state=.*/);
            signin.state.should.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g);
        });
    });
});
