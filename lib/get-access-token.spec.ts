/// <reference path="../typings/tsd.d.ts" />
'use strict';

import chai = require('chai');
import sinon = require('sinon');
import fs = require('fs');
import FB = require('fb');
var should = chai.should();

import getAccessToken = require('./get-access-token');

var fixtureFacebookAccessToken = JSON.parse(fs.readFileSync(__dirname + '/../test/fixtures/facebook-access-token.json').toString());

describe('oauth2-facebook', () => {

    describe('get-access-token', () => {

        afterEach(() => {
            if (FB.api.restore) {
                FB.api.restore();
            }
        });

        var code = 'asdf_asdf_asdf';

        var config = {
            appId: 'abc123',
            appSecret: 'secret',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/facebook/callback'
            }
        };

        it('should handle access_token request errors', (done) => {

            sinon.stub(FB, 'api', function (action, options, callback) {
                callback({error: 'oauth/access_token error occurred.'});
            });

            getAccessToken(config, code).catch((err) => {
                err.should.equal('oauth/access_token error occurred.');
            })
                .then(done, done);

        });

        it('should handle non valid response', (done) => {

            sinon.stub(FB, 'api', function (action, options, callback) {
                callback('text response');
            });

            getAccessToken(config, code).catch((err) => {
                err.should.equal('oauth/access_token error occurred.');
            })
                .then(done, done);

        });

        it('should return a facebook oauth access token', (done) => {

            sinon.stub(FB, 'api', function (action, options, callback) {
                callback(fixtureFacebookAccessToken);
            });

            getAccessToken(config, 'abc123').then((res) => {
                res.accessToken.should.equal(fixtureFacebookAccessToken.access_token);
            })
                .then(done, done);

        });

    });

});
