/// <reference path="../typings/tsd.d.ts" />
'use strict';

import chai = require('chai');

var should = chai.should();

import signInUrl = require('./sign-in-url');

describe('Oauth2', () => {

    describe('Facebook', () => {

        let config = {
            appId: 'abc123',
            appNamespace: 'rsmweb',
            redirectUri: '/signin/fb'
        };

        it('should', () => {
            should.exist(signInUrl);
            var url = signInUrl(config);
            console.log(url);
        });

    });

});
