//  OpenShift sample Node application
var express = require('express'),
    app     = express();
var os = require('os');
var morgan = require('morgan')
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(morgan('combined'))

app.get('/', function (req, res) {
    res.send('please invoke with a path of /Curam or /CuramStatic is needed');
});

// Liveness probe checks if the container in which it is configured is still running. 
// If the liveness probe fails, the kubelet kills the container, which will be subjected to its restart policy. 
app.get('/healthz', function (req, res) {
    res.send('HEALTHY');
});

// readiness probe determines if a container is ready to service requests. 
// If the readiness probe fails a container, the endpoints controller ensures the container 
// has its IP address removed from the endpoints of all services. 
app.get('/health', function (req, res) {
    res.send('READY');
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

// repsond with the hostname (in OCP this will be the container name)
app.get('/hostname', function (req, res) {
    res.send('{serverName:'+os.hostname()+';}');
});

// repsond with the hostname (in OCP this will be the container name)
app.get('/pathbased/hostname', function (req, res) {
    res.send('Pathbased result {serverName:'+os.hostname()+';}');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
