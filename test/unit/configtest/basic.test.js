/**
 * Basic tests to check whether sails has successfully loaded, along with the hook
 */

var expect = require('expect.js'),
  Sails = require('sails').Sails,
  allowedHostsHook = require('../../../index.js');

/* global describe, it, sails */
describe('With minimal configuration', function () {
  it('sails and the allowed-hosts hook load successfully', function (done) {
    new Sails().load({
      environment: 'test',
      hooks: {
        grunt: false,
        allowedhosts: allowedHostsHook
      },
      loadHooks: [
        'moduleloader',
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
      expect(sails.config.allowedhosts.skipEnvs).to.be.an('array');
      expect(sails.config.allowedhosts.errorResponse).to.be.a('function');

      return done();
    });
  });
});
