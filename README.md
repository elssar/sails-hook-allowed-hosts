# sails-hook-allowed-hosts

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

Sails hook to ensure that only requests made from authorized hosts/IP addresses are allowed. Inspired by the
[`ALLOWED_HOSTS`](https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts)
setting in Django.

## Installation

```bash
npm install sails-hook-allowed-hosts --save
```

## Usage

###### Install the hook and add configuration for it

```javascript
module.exports.allowedhosts = {
  allowedHosts: [array with strings or regular expression matches for allowed hosts]  // default [/.*/]
  skipEnvs: [array listing environments for which to skip host checking]              // default ['test', 'development']
};
```

Optionally you can customize the response in case the host doesn't match. By default a 400 badRequest is sent

```javascript
module.exports.allowedhosts = {
  allowedHosts: [/test\.com/]
  skipEnvs: ['test', 'development']
  errorResponse: function (res) {
    return res.redirect('test.com');
  }
};
```

[travis-image]: https://travis-ci.org/elssar/sails-hook-allowed-hosts.svg?branch=master
[travis-url]: https://travis-ci.org/elssar/sails-hook-allowed-hosts

[coveralls-image]: https://coveralls.io/repos/elssar/sails-hook-allowed-hosts/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/elssar/sails-hook-allowed-hosts
