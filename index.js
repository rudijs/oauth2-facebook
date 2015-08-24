'use strict';

var signIn = require('./lib/sign-in'),
  getAccessToken = require('./lib/get-access-token'),
  getProfile = require('./lib/get-profile');

exports.signIn = signIn;

exports.getAccessToken = getAccessToken;

exports.getProfile = getProfile;
