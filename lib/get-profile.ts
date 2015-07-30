/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');
import Q = require('q');
import FB = require('fb');

function getProfile(logger:any, token:string):any {

    assert.equal(typeof logger, 'function', 'required argument logger must be a function');
    assert.equal(typeof token, 'string', 'required argument token must be a string');

    let deferred:any = Q.defer();

    FB.api('me', {access_token: token}, function (res:any):any {

        if (!res.email) {
            logger(res);
            deferred.reject(Error('FB.api sign in error'));
        }
        else {
            deferred.resolve(res);
        }

    });

    return deferred.promise;

}

export = getProfile;
