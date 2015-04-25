(function ( $ ) {


 
    $.fn.acroute = function( options ) {

        var myPosition;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();

        var input = document.getElementById('inputform');
        var autocomplete = new google.maps.places.Autocomplete(input);

        // DETECT OPTIONS
        var settings = $.extend({
            originType: "geolocation",
            originDirections: { lat: null, lng: null },
            destination: { lat: null, lng: null },
            showDetailedRoute: false,
            showMap: false,
            mapContainer: null
        }, options );


        // GET GEOLOCATION ACCESS AND DATA
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){

                // RECOVERY ADDRESS AND FILL INPUT TEXT
                recoveryAddress(position.coords.latitude, position.coords.longitude);

                // CREATE CUSTOM MAP
                if(settings.showMap){

                    directionsDisplay = new google.maps.DirectionsRenderer(
                        {
                            hideRouteList:false,
                            suppressBicyclingLayer:true,
                            suppressInfoWindows:true,
                            polylineOptions:{draggable:true, editable:true}
                        }
                    );

                    var myOptions = {
                        zoom: 17,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById(settings.mapContainer), myOptions);
                    myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var marker = new google.maps.Marker({
                        position:myPosition,
                        map:map,
                        icon: 'img/pointer.png'
                    });
                    marker.setMap(map);
                    map.setCenter(myPosition);

                }


                
            });
        }


        // CREATE CONTAINER FOR RECEIVE AUTO-COMPLETE DATA
        $(this).parent().append('<div class="acroutecontainer"></div>');
        
        // LISTEN CHANGES ON INPUT FIELD     
        setInterval(function(){
            this.onkeyup = function(){
                


            }
        },1000);
 
    };
 
}( jQuery ));




function recoveryAddress(lat, lng) {

    var objPosition = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': objPosition}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {

                var endereco = results[1].formatted_address;
                $('.acroutecontainer').prev().val(endereco);

            }else{
                console.log("erro");
            }

            return results[1].formatted_address;

        }else{
            console.log("erro: " + status);
        }


    });
}



function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return false;
            break;
        case error.POSITION_UNAVAILABLE:
            return false;
            break;
        case error.TIMEOUT:
           return false;
            break;
        case error.UNKNOWN_ERROR:
            return false;
            break;
    }
}

