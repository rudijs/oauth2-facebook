# oauth2-facebook

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
