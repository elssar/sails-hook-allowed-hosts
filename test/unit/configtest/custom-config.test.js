/**
 * Basic tests to check whether sails has successfully loaded, along with the hook
 * and its custom configuration
 */

var path = require('path'),
  expect = require('expect.js'),
  Sails = require('sails').Sails,
  allowedHostsHook = require('../../../index.js'),
  skeletonAppPath = path.resolve(__dirname, '../apptest/app-skeleton');

/* global describe, it, sails */
describe('With custom configuration', function () {
  it('sails and the allowed-hosts hook load successfully', function (done) {
    new Sails().load({
      environment: 'test',
      appPath: skeletonAppPath,
      hooks: {
        grunt: false,
        allowedhosts: allowedHostsHook
      },
      loadHooks: [
        'moduleloader',
        'userconfig',
        'allowedhosts'
      ],
      log: {
        level: 'silent'
      }
    },
    function (err) {
      expect(err).to.not.be.ok();
      expect(sails).to.be.ok();

      expect(sails.hooks.allowedhosts).to.be.ok();
      expect(sails.config.allowedhosts.allowedHosts).to.be.an('array');
      expect(sails.config.allowedhosts.allowedHosts).to.contain('test.com');

      expect(sails.config.allowedhosts.skipEnvs).to.be.an('array');
      expect(sails.config.allowedhosts.skipEnvs).to.contain('development');
      expect(sails.config.allowedhosts.skipEnvs).to.not.contain('test');

      expect(sails.config.allowedhosts.errorResponse).to.be.a('function');

      return done();
    });
  });
});
