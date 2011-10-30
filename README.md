# Haraka API Server

Plugin for Haraka - https://github.com/baudehlo/Haraka

Code pieced together using multiple resources around the web... I'm sorry if i did not honor the use of your function (person who wrote POST variables parser) I forgot the URL's. A big thank you to baudehlo for an amazing smtp server. I cannot wait to see this develop more.

# Description

Have you ever wanted to send out emails from your web application but have issues with the server getting clogged up, or having a great hosting provider that throttles your email usage. Well forget PostmarkApp, and their finicky policies, about bulk sending, or the price of it. With Haraka API Server you get instant access to Haraka's Outbound mail class via HTTP access, via the POST server variables. Perfect for building a simple curl request to send emails from your web app. Just set an API Key, and a port to run your server on load it in your Haraka config and your good to go. Because of Haraka's amazing scaleability, and speed this is the perfect solution for low to mid range activity web app servers. There is even a html form available on the http server so you can test it and make sure everything is up and running.

# Use

Send data via POST to http://server:port/api the available variables are to, from, subject, body, and of course key (for authorization purposes).
Make sure to set your key, port, and default from address in the top of the plugin file.

You may also access an HTML form to test the plugin at http://server:port/

# Disclaimer

Be wise don't send emails from accounts you don't own or have the possibility to create.
I will not be held responsible for abuse of this plugin.