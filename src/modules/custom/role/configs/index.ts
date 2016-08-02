module.exports = {
    app:{
        roles:{
          'view-roles':{
              title: 'View Roles',
              description: 'view roles'
          }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};