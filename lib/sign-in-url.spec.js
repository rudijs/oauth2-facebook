/// <reference path="../typings/tsd.d.ts" />
'use strict';
var chai = require('chai');
var should = chai.should();
var signInUrl = require('./sign-in-url');
describe('Oauth2', function () {
    describe('Facebook', function () {
        var config = {
            appId: 'abc123',
            appNamespace: 'rsmweb',
            redirectUri: '/signin/fb'
        };
        it('should', function () {
            should.exist(signInUrl);
            var url = signInUrl(config);
            console.log(url);
        });
    });
});
//# sourceMappingURL=sign-in-url.spec.js.map