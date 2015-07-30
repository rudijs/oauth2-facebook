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
        describe('success', function () {
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
        });
    });
});
