const routes = require('next-routes');

module.exports = routes()
                        .add('home','/','index')
                        .add('feeds','/feeds/:type','feeds')
                        .add('user','/user/:id','user')
                        .add('feed','/feed/:id','feed')