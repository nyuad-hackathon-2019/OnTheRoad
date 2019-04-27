
// AppViewModel main function
// display click on pins
// change pin colors
// only display main roads

handlingAPI 
function AppViewModel(){
    var self = this ;
    // my locations 
    var iconurls = {
      'Car Accident': "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
      'Checkpoint': "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
      'Confrontation': "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }
    var locations = [
        {title: 'Car Accident', location: {lat:31.447446,lng:35.025766}},
        {title: 'Car Accident', location: {lat:32.047791,lng:35.462557}},
        {title: 'Checkpoint', location: {lat:31.603713,lng:35.113804}},
        {title: 'Confrontation', location: {lat:31.799084,lng:35.234699}},
        {title: 'Checkpoint', location: {lat:32.363947,lng:35.205358}}
      ];
    this.searchInput = ko.observable("");
    this.markers = [];
    // creating popUps and dealing with foursquare API
    this.populateInfoWindow = function (marker, infowindow ) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker =marker;
          // Foursquare API credintials 
          clientId = "RPOWZUXIVWV2MDW0WOCBKCHFFIQKQJQ21WAR5PSMWF50N3WW";
          clientSecret = "ZGIF25ZVFH3TTVIXEWIUMGDWMZHG3OLRJ1J15JIW025XAHTC";
          var url = "https://api.foursquare.com/v2/venues/search?ll="+marker.lat+","+marker.lng+"&client_id=" + clientId +
                "&client_secret=" + clientSecret+"&v=20170708&m=foursquare"; 
                console.log(url);
                $.getJSON(url).done(function(re) {
                var response = re.response.venues[0];
                var address0 = response.location.formattedAddress[0];
                var address1 = response.location.formattedAddress[1];
                var address2 = response.location.formattedAddress[2];
                var category = response.categories[0].name;
                

                var content =
                    '<div>'
                    +'<h4>' + marker.title + '</h4>'
                    + '<div>'
                    +  '<h6> Time: ' +  '</h6> ' // marker.time +
                    +  '<h8> Severity: '+ '</h8> <br>' // marker.severity +
                    //+  '<h8>'+address1+'</h8> <br>'
                    //+  '<h8>'+address2+'</h8> <br>'
                    + '</div>'
                    + '</div>';

                infowindow.setContent(content);
            
            // handling API error 
            }).fail(function() {
                alert("unfortunatley the Foursquare API didn't load properly, please try again");
            });
            
            
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      };  

    this.popUp = function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
    };


    // loading map to the view 
    this.initMap = function () {
        var largeInfowindow = new google.maps.InfoWindow();

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:31.863903, lng:35.164375 },
          zoom: 8
        });   

        var placeMarker = function (location) {
            var options = { position: location, map: map };
            var marker = new google.maps.Marker(options);

            //marker.setMap(map);
            //this.markers.push(marker);

            largeInfowindow.setContent(
               '<div>'
                + '<a href="/templates/inputform.html">شاركني</a>'
                + '</div>'
              );
            largeInfowindow.open(map, marker);
        };

        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
        });
    
    
    for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          var iconurl = iconurls[title];
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            lat: position.lat,
            lng:position.lng,
            title: title,
            map: map,
            animation: google.maps.Animation.DROP,
            id: i,
            icon: {
              url: iconurl
            }
          });
          // Push the marker to our array of markers.
          marker.setMap(map);

          this.markers.push(marker);
          // Create an onclick event to open the large infowindow at each marker.
          //this.marker.addListener('click', self.popUp);
          

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              
              var content =
                '<div>'
                +'<h4>' + locations[i].title + '</h4>'
                //+'<h4>' + category + '</h4>'
                + '<div>'
                +  '<h6> Threat level: </h6> '
                //+  '<h8>'+address0+'</h8> <br>'
                //+  '<h8>'+address1+'</h8> <br>'
                //+  '<h8>'+address2+'</h8> <br>'
                + '</div>'
                + '</div>';

              largeInfowindow.setContent(content);
              largeInfowindow.open(map, marker);
            }
          })(marker, i));

          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            //this.setAnimation(google.maps.Animation.BOUNCE);
          });
          marker.addListener('mouseout', function() {
            //this.setAnimation(null);
          });
        }
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(map);
        }

    };

    this.initMap();

    this.venuesfilter = ko.computed(function() {
        var venues = [];    
        for (var i = 0; i < this.markers.length; i++) {


            var venue = this.markers[i];

            // live searching 
            if (venue.title.toLowerCase().includes(this.searchInput()
                    .toLowerCase())) {
                venues.push(venue);
                this.markers[i].setVisible(true);
            } else {
                this.markers[i].setVisible(false);
            }
        }
        return venues;
    }, this);


    


}



function handlingAPI()
 {
        alert("Google API error, please reload the page");

 };



function start()
{

    ko.applyBindings(new AppViewModel());
}