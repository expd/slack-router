var http = require('http')
var request = require('request')
var fs = require('fs')
var _ = require('underscore')

var main = function(opts) {
  var url = opts.url
  var port = opts.port

  var routes = _.map(opts.routes, function(route) {
    return _.extend(_.omit(route , 'regex') , {
      'regex': eval(route.regex)
    })
  })

  console.info(routes)


  var server = http.createServer(function(req, res) {

    var body = ''

    req.on('data', function(chunk) {
      body += chunk
    })

    req.on('end', function() {
      var json = JSON.parse(body)

      console.log(routes ,'routes')

      var r = _.find(routes, function(r) {
        return r.regex.test(body)
      })

      if(r) {
        console.info('Applying router')
        json = _.extend(json , _.omit(r,'regex'))
      }

      request.post( { url:url , json:true , body:json}).pipe(res)
    })
  });

  server.listen(port);
  console.log("Server is listening on port " + port);

}

if (require.main === module) {
  // read command line
  var opts
  var argv = require('minimist')(process.argv.slice(2))
  if (argv.config) {
    opts = JSON.parse(fs.readFileSync(argv.config))
  }

  main(opts)
}
