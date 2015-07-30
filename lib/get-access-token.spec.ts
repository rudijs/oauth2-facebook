/// <reference path="../typings/tsd.d.ts" />
'use strict';

import chai = require('chai');
import sinon = require('sinon');
import fs = require('fs');
import FB = require('fb');
let should:any = chai.should();

import getAccessToken = require('./get-access-token');

let fixtureFacebookAccessToken:string = JSON.parse(fs.readFileSync(__dirname + '/../test/fixtures/facebook-access-token.json').toString());

describe('oauth2-facebook', () => {

    describe('get-access-token', () => {

        afterEach(() => {
            if (FB.api.restore) {
                FB.api.restore();
            }
        });

        let code:string = 'asdf_asdf_asdf';

        let config:any = {
            appId: 'abc123',
            appSecret: 'secret',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/facebook/callback'
            }
        };

        it('should handle access_token request errors', (done:any) => {

            should.exist(getAccessToken);

            sinon.stub(FB, 'api', function (action:string, options:any, callback:any):any {
                callback({error: 'oauth/access_token error occurred.'});
            });

            getAccessToken(config, code).catch((err:string) => {
                err.should.equal('oauth/access_token error occurred.');
            })
                .then(done, done);

        });

        it('should handle non valid response', (done:any) => {

            sinon.stub(FB, 'api', function (action:string, options:any, callback:any):any {
                callback('text response');
            });

            getAccessToken(config, code).catch((err:string) => {
                err.should.equal('oauth/access_token error occurred.');
            })
                .then(done, done);

        });

        it('should return a facebook oauth access token', (done:any) => {

            sinon.stub(FB, 'api', function (action:string, options:any, callback:any):any {
                callback(fixtureFacebookAccessToken);
            });

            getAccessToken(config, 'abc123').then((res:any) => {
                res.accessToken.should.equal(fixtureFacebookAccessToken.access_token);
            })
                .then(done, done);

        });

    });

});
