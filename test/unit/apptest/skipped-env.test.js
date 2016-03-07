/**
 * Test the hook in a skipped environment
 */

var path = require('path'),
  request = require('supertest'),
  Sails = require('sails').Sails,
  allowedHostsHook = require('../../../index.js'),
  skeletonAppPath = path.resolve(__dirname, '../apptest/app-skeleton');

/* global describe, it, before, after, sails */
describe('In a skipped environment', function () {
  before(function (done) {
    new Sails().load({
      environment: 'development',
      appPath: skeletonAppPath,
      hooks: {
        grunt: false,
        allowedhosts: allowedHostsHook
      },
      loadHooks: [
        'moduleloader',
        'request',
        'responses',
        'userconfig',
        'http',
        'allowedhosts'
      ],
      log: {
        level: 'silent'
      }
    },
    function (err) {
      return done(err);
    });
  });

  after(function (done) {
    if (sails) { return sails.lower(done); }
    return done();
  });

  it('returns ok for a request with host header missing', function (done) {
    request(sails.hooks.http.app)
      .get('/')
      .expect(200, done);
  });

  it('returns ok for a request with a non allowed host', function (done) {
    request(sails.hooks.http.app)
      .get('/')
      .set('Host', 'rest.com')
      .expect(200, done);
  });

  it('returns ok for a request with a allowed host', function (done) {
    request(sails.hooks.http.app)
      .get('/')
      .set('Host', 'test.com')
      .expect(200, done);
  });
});
