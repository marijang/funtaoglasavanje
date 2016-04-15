var connect = require('connect');
var serveStatic = require('serve-static');
console.log(__dirname);
connect().use(serveStatic(__dirname+'/dist')).listen(8082, function(){
    console.log('Server running on 8082...');
});