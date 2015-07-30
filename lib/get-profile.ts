/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');
import Q = require('q');
import FB = require('fb');

function getProfile(token:string):any {

    assert.equal(typeof token, 'string', 'required argument token must be a string');

    let deferred:any = Q.defer();

    FB.api('me', {access_token: token}, function (res:any):any {

        if (!res.email) {
            deferred.reject(Error(res));
        }
        else {
            deferred.resolve(res);
        }

    });

    return deferred.promise;

}

export = getProfile;
