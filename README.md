# 4front Forecast Demo

Simple app that demonstrates the use of the [express-request-proxy](https://www.npmjs.com/package/express-request-proxy) add-on to proxy API calls to both the [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/) and the [Dark Sky Forecast API](https://developer.forecast.io/). Using the request proxy avoids exposing the API keys in client JavaScript. While this sample doesn't utilize response caching, that could also be used to avoid being rate limited if the same API parameters were being invoked over and over again.

The add-on is declared in the package.json file. The API keys are stored as environment variables to avoid checking secrets into source control.

~~~json
"router": [
  {
    "path": "/api/forecast/:latLong",
    "module": "express-request-proxy",
    "options": {
      "url": "https://api.forecast.io/forecast/:apikey/:latLong",
      "params": {
        "apikey": "env:DARKSKY_API_KEY"
      }
    }
  },
  {
    "path": "/api/geocode",
    "module": "express-request-proxy",
    "options": {
      "url": "https://maps.googleapis.com/maps/api/geocode/json",
      "query": {
        "key": "env:GOOGLE_API_KEY"
      }
    }
  },
  {
    "module": "webpage"
  }
]
~~~

### Client Code
The client JavaScript then points to the configured proxy endpoints rather than the actual origin API endpoints.

~~~js
$.ajax({
  url: "/api/forecast/" + encodeURIComponent(latitude + ',' + longitude),
  success: function(data) {
    callback(null, data);
  },
  error: function(data) {
    callback(data);
  }
});
~~~

### Cloning Sample
Run the following command with the [4front-cli](http://4front.io/docs/cli):

~~~sh
$ 4front create-app --template-url https://github.com/4front/forecast-demo/archive/master.zip
~~~
