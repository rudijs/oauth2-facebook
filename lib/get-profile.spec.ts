/// <reference path="../typings/tsd.d.ts" />
'use strict';

import sinon = require('sinon');
import chai = require('chai');
import fs = require('fs');
import path = require('path');
import FB = require('fb');

let should:any = chai.should();

let fixtureFacebookUserProfile:any = JSON.parse(
    fs.readFileSync(
    path.resolve(__dirname, '../test/fixtures/facebook-user-profile.json')).toString());

import getProfile = require('./get-profile');

describe('oauth2-facebook', () => {

    describe('get-profile', () => {

        afterEach(() => {
            if (FB.api.restore) {
                FB.api.restore();
            }
        });

        it('should return a user profile', (done:any) => {

            should.exist(getProfile);

            sinon.stub(FB, 'api', function (action:string, options:any, callback:any):any {
                callback(fixtureFacebookUserProfile);
            });

            getProfile('abc123').then(function (res:any):any {
                res.id.should.equal(fixtureFacebookUserProfile.id);
            })
                .then(done, done);

        });

        it('should handle an empty response', (done:any) => {

            sinon.stub(FB, 'api', function (action:string, options:any, callback:any):any {
                callback();
            });

            getProfile('abc123').catch(function (err:any):any {
                err.should.equal('getProfile/me error occurred');
            })
                .then(done, done);

        });

        it('should handle a facebook api error response', (done:any) => {

            sinon.stub(FB, 'api', function (action:string, options:any, callback:any):any {
                callback(JSON.parse('{"error":{"message":"Invalid OAuth access token.","type":"OAuthException","code":190}}'));
            });

            getProfile('abc123').catch(function (err:any):any {
                err.should.equal('Invalid OAuth access token.');
            })
                .then(done, done);

        });

        it('should handle an unexpected response', (done:any) => {

            sinon.stub(FB, 'api', function (action:string, options:any, callback:any):any {
                callback('Unexpected text response');
            });

            getProfile('abc123').catch(function (err:any):any {
                err.should.equal('Unexpected text response');
            })
                .then(done, done);

        });

    });

});
