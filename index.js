module.exports = function (sails) {
  var util = require('sails-util'),
    /**
     * Definition for sails-hook-allowed-hosts
     * Conforms to http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification
     *
     * This hook takes in an array of strings and regular-expressions that whitelist a hostname, and matches
     * the host header of all incoming requests against that array. If the hostname is whitelisted,
     * lets the request go throug, else returns an error.
     *
     * Inspired by the ALLOWED_HOSTS (https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts)
     * setting in Django
     *
     * @type {Object}
     */
    allowedHostsHookDef = {
      /**
       * Default configuration for the hook
       *
       * @type {Object}
       */
      defaults: {
        __configKey__: {
          allowedHosts: [/.*/],
          skipEnvs: ['test', 'development'],
          errorResponse: function (res) {
            sails.log.error('sails-hook-allowed-hosts :: Invalid host header');
            return res.json(400, {
              error: 'invalidHost'
            });
          }
        }
      },
      /**
       * Inialize the hook
       *
       * @param  {Function} cb
       */
      initialize: function (cb) {
        cb = util.optional(cb);

        sails.log.verbose('sails-hook-allowed-hosts loaded successfully');
        return cb();
      },
      routes: {
        before: {
          /**
           * Before a request is passed to the router, check whether the host header matches a host
           * or host pattern set in allowedHosts
           * If there is a match, allow the request to go through, else return an error
           *
           * @param  {Object}   req  Sails request object
           * @param  {Object}   res  Sails response object
           * @param  {Function} next
           */
          'all /*': function (req, res, next) {
            var self = allowedHostsHookDef,
              config = sails.config[self.configKey],
              pass;

            if (util.includes(config.skipEnvs, sails.config.environment)) {
              return next();
            }

            pass = !(util.isUndefined(util.find(config.allowedHosts, function (allowedHost) {
              return req.host.match(allowedHost);
            })));

            if (pass) {
              return next();
            }

            return config.errorResponse(res);
          }
        }
      }
    };

  return allowedHostsHookDef;
};
