var express           = require('express');
var BridgesController = require('bridges-controller');
var BridgesRoutes     = require('bridges-routes');
var fs                = require('fs');
var path              = require('path');

class BridgesApplication {

  constructor(options) {
    if (!fs.existsSync(options.root)) {
      throw new Error('options.root must be a directory');
    }
    this.root = options.root;
    this.server = express();
    
    if (!options.controllers) {
      options.controllers = { inject: [] };
    }
  
    var controllers = BridgesController.load({
      directory : path.join(options.root, '/controllers'),
      inject : options.controllers.inject
    })

    this.server.use('/v1', BridgesRoutes.draw({
      controllers : controllers,
      path : path.join(options.root, 'config/routes')
    }))
   
    this.server.use(function(error, req, res, next) {
      if (error) {
        res.status(500).send({
          success: false,
          error  : error.message
        })
      } else {
        next()
      }
    })
  }

}

module.exports = BridgesApplication
