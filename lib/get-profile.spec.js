/// <reference path="../typings/tsd.d.ts" />
'use strict';
var sinon = require('sinon');
var chai = require('chai');
var fs = require('fs');
var path = require('path');
var FB = require('fb');
var should = chai.should();
var fixtureFacebookUserProfile = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../test/fixtures/facebook-user-profile.json')).toString());
var logger = sinon.spy();
var getProfile = require('./get-profile');
describe('oauth2-facebook', function () {
    describe('get-profile', function () {
        afterEach(function () {
            if (FB.api.restore) {
                FB.api.restore();
            }
            logger.reset();
        });
        it('should return a user profile', function (done) {
            should.exist(getProfile);
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback(fixtureFacebookUserProfile);
            });
            getProfile(logger, 'abc123').then(function (res) {
                res.id.should.equal(fixtureFacebookUserProfile.id);
            })
                .then(done, done);
        });
        it('should reject non valid user profile response', function (done) {
            sinon.stub(FB, 'api', function (action, options, callback) {
                callback('text');
            });
            getProfile(logger, 'abc123').catch(function (err) {
                sinon.assert.calledOnce(logger);
                err.message.should.equal('FB.api sign in error');
            })
                .then(done, done);
        });
    });
});
