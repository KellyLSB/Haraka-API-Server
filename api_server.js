var http = require('http'),
sys = require('sys'),
querystring = require('querystring');

// Set listening port
var port = "8079";

// Set API Key
var api_key = "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX";

// Set Default From Email Address
var from = "noreply@yenn.co";

// Create the listening server
http.createServer(function(request, response)
 {
    sys.puts('Request for ' + request.url);

    switch (request.url)
    {
    case '/':
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.write(
        '<h1>Haraka API Server</h1>' +
        '<p>You you can use this server by calling <strong>http://localhost:' + port + '/api</strong> and passing <strong>key</strong>, ' +
        '<strong>to</strong>, <strong>from</strong> <i>(optional)</i>, <strong>subject</strong>, and <strong>body</strong> as the POST variables.</p>' +
        '<form action="/api" method="post">' +
        'Auth Key: <input type="password" name="key" /><br />' +
        'To: <input type="text" name="to"><br />' +
        'From: <input type="text" name="from"> <i>(optional)</i><br />' +
        'Subject: <input type="text" name="subject"><br />' +
        'Body: <textarea name="body" style="width: 500px;height: 250px;"></textarea><br />' +
        '<input type="submit" value="Submit">' +
        '</form>'
        );
        response.end();
        break;
    case '/api':
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        post_handler(request, api_key, from,
        function(post, api_key, from)
        {
            // Begin send mail
            var outbound = require('./outbound');

            // Grab Parent object
            var plugin = this;

				// Allow overriding of from address
            if (post.from) var from = post.from;

            var contents = [
            "From: " + from,
            "To: " + post.to,
            "MIME-Version: 1.0",
            "Content-Type: text/html; charset=ISO-8859-1",
            "Subject: " + post.subject,
            "",
            post.body,
            ""].join("\n");

            var outnext = function(code, msg) {
                switch (code) {
                case DENY:
                    var output = "Sending mail failed: " + msg;
                    break;
                case OK:
                    var output = "mail sent";
                    break;
                default:
                    var output = "Unrecognised return code from sending email: " + msg;
                    break;
                }

                response.write(output);
                response.end();
            };

            if (post.key === api_key)
            outbound.send_email(from, post.to, contents, outnext);
            else response.write(sys.inspect("API Key was invalid."));

        });

        break;
    };
}).listen(port);

// Grab post data
function post_handler(request, api_key, from, callback)
 {
    var _REQUEST = {};
    var _CONTENT = '';

    if (request.method == 'POST')
    {
        request.addListener('data',
        function(chunk)
        {
            _CONTENT += chunk;
        });

        request.addListener('end',
        function()
        {
            _REQUEST = querystring.parse(_CONTENT);
            callback(_REQUEST, api_key, from);
        });
    };
};
