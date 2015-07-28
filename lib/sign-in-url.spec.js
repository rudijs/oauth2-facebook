/// <reference path="../typings/tsd.d.ts" />
'use strict';
var should = require('chai').should();
var signInUrl = require('./sign-in-url');
describe('Oauth2', function () {
    describe('Facebook', function () {
        it('should', function () {
            should.exist(signInUrl);
            var url = signInUrl({});
            console.log(url);
        });
    });
});
//# sourceMappingURL=sign-in-url.spec.js.map