/// <reference path="../typings/tsd.d.ts" />
'use strict';

var should = require('chai').should();

var signInUrl = require('./sign-in-url');

describe('Oauth2', () => {

    describe('Facebook', () => {

        it('should', () => {
            should.exist(signInUrl);
            var url = signInUrl({});
            console.log(url);
        });

    });

});
