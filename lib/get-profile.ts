/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');
import Q = require('q');
import FB = require('fb');

function getProfile(token:string):any {

    assert.equal(typeof token, 'string', 'required argument token must be a string');

    let deferred:any = Q.defer();

    FB.api('me', {
        fields: ['id', 'name', 'first_name', 'last_name', 'email', 'gender', 'timezone', 'link', 'locale'],
        access_token: token
    }, function (res:any):any {

        if (!res) {
            deferred.reject('getProfile/me error occurred');
        }
        else if (res.email) {
            deferred.resolve(res);
        }
        else if (res.error && res.error.message) {
            deferred.reject(res.error.message);
        }
        else {
            deferred.reject(res);
        }

    });

    return deferred.promise;

}

export = getProfile;
