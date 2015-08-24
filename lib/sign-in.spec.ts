/// <reference path="../typings/tsd.d.ts" />
'use strict';

import chai = require('chai');

let should:any = chai.should();

import linkedinSignIn = require('./sign-in');

describe('oauth2-facebook', () => {

    describe('sign-in-url', () => {

        let config:any = {
            appId: 'abc123',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/facebook/callback'
            }
        };

        it('should return a valid facebook sign in url', () => {
            should.exist(linkedinSignIn);

            let signin:any = linkedinSignIn(config);

            /* tslint:disable */
            signin.url.should.match(/https:\/\/www\.facebook\.com\/dialog\/oauth\?scope=public_profile,email&client_id=abc123&redirect_uri=http:\/\/example.com\/auth\/facebook\/callback&state=.*/);

            signin.state.should.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g);
        });

    });

});
