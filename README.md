# oauth2-facebook

[![Build Status](https://travis-ci.org/rudijs/oauth2-facebook.svg?branch=master)](https://travis-ci.org/rudijs/oauth2-facebook)
[![Coverage Status](https://coveralls.io/repos/rudijs/oauth2-facebook/badge.svg?branch=master&service=github)](https://coveralls.io/github/rudijs/oauth2-facebook?branch=master)
[![Dependencies Status](https://david-dm.org/rudijs/oauth2-facebook.svg)](https://david-dm.org/rudijs/oauth2-facebook.svg)

## Overview

Node.js oauth2 Facebook sign in module.

This module is written in Typescript, uses Promises and the author's intended case use is with KoaJS.

## API

signInUrl => Returns a Facebook Oauth sign in URL to send the user to.
 
getAccessToken => With the code returned from signInUrl, request a Facebook API access token.
 
getProfile => With the access token returned from getAccessToken, request the user profile.

## Usage

Use `signInUrl` in your routes to send the user to sign in with facebook.com.

Use `getAccessToken` and `getProfile` in your controller to retrieve the user profile from facebook's API.

Also review the test code, `*.spec.ts`, files in the github.com source repo.

Code review, suggestions and pull requests are welcome - thanks.
