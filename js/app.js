$(function() {

  $("#place-form").submit(function(e) {
    e.preventDefault();

    var placeInput = $("#place-input").val();
    if (placeInput.length === 0)
      return;

    $.ajax({
      url: "/api/geocode",
      method: 'get',
      data: {address: placeInput},
      success: function(data) {
        var resultsPanel = $("#results-panel");

        resultsPanel.show();
        if ($.isArray(data.results) && data.results.length > 0) {
          resultsPanel.find("[data-header]").html("Weather forecast for " +
            formatPlaceName(data.results[0].formatted_address));

          var location = data.results[0].geometry.location;
          getForecast(location.lat, location.lng, function(err, forecast) {
            if (err)
              console.error(err);
            else
              resultsPanel.find("[data-forecast]").text(JSON.stringify(forecast, null, 4));
          });
        }
      }
    });
  });

  function formatPlaceName(name) {
    name = name.split(', ');
    if (name.length >= 3 && name[0] === name[1])
      name = name.slice(1);
    return name.join(', ');
  }

  function getForecast(latitude, longitude, callback) {
    $.ajax({
      url: "/api/forecast/" + encodeURIComponent(latitude + ',' + longitude),
      success: function(data) {
        callback(null, data);
      },
      error: function(data) {
        callback(data);
      }
    });
  }
});
