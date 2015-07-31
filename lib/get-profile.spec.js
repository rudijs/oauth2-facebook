/// <reference path="../typings/tsd.d.ts" />
'use strict';
var sinon = require('sinon');
var chai = require('chai');
var fs = require('fs');
var path = require('path');
var FB = require('fb');
var should = chai.should();
var fixtureFacebookUserProfile = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../test/fixtures/facebook-user-profile.json')).toString());
var getProfile = require('./get-profile');
describe('oauth2-facebook', function () {
    describe('get-profile', function () {
        afterEach(function () {
            if (FB.api.restore) {
                FB.api.restore();
            }
        });
        it('should return a user profile', function (done) {
            should.exist(getProfile);
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback(fixtureFacebookUserProfile);
            });
            getProfile('abc123').then(function (res) {
                res.id.should.equal(fixtureFacebookUserProfile.id);
            })
                .then(done, done);
        });
        it('should handle an empty response', function (done) {
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback();
            });
            getProfile('abc123').catch(function (err) {
                err.should.equal('getProfile/me error occurred');
            })
                .then(done, done);
        });
        it('should handle a facebook api error response', function (done) {
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback(JSON.parse('{"error":{"message":"Invalid OAuth access token.","type":"OAuthException","code":190}}'));
            });
            getProfile('abc123').catch(function (err) {
                err.should.equal('Invalid OAuth access token.');
            })
                .then(done, done);
        });
        it('should handle an unexpected response', function (done) {
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback('Unexpected text response');
            });
            getProfile('abc123').catch(function (err) {
                err.should.equal('Unexpected text response');
            })
                .then(done, done);
        });
    });
});
