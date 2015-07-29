/// <reference path="../typings/tsd.d.ts" />
'use strict';
var chai = require('chai');
var sinon = require('sinon');
var fs = require('fs');
var FB = require('fb');
var should = chai.should();
var getAccessToken = require('./get-access-token');
var fixtureFacebookAccessToken = JSON.parse(fs.readFileSync(__dirname + '/../test/fixtures/facebook-access-token.json').toString());
describe('oauth2-facebook', function () {
    describe('get-access-token', function () {
        afterEach(function () {
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
        it('should handle access_token request errors', function (done) {
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback({ error: 'oauth/access_token error occurred.' });
            });
            getAccessToken(config, code).catch(function (err) {
                err.should.equal('oauth/access_token error occurred.');
            })
                .then(done, done);
        });
        it('should handle non valid response', function (done) {
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback('text response');
            });
            getAccessToken(config, code).catch(function (err) {
                err.should.equal('oauth/access_token error occurred.');
            })
                .then(done, done);
        });
        it('should return a facebook oauth access token', function (done) {
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback(fixtureFacebookAccessToken);
            });
            getAccessToken(config, 'abc123').then(function (res) {
                res.accessToken.should.equal(fixtureFacebookAccessToken.access_token);
            })
                .then(done, done);
        });
    });
});
