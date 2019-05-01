$(document).ready(function(){

    $("#SearchCenter").on("click",function(){

        if(navigator.geolocation==undefined)
        {
            alert("Geolocation undefined");
        }

        else
        {
            alert("Geolocation Available");
            navigator.geolocation.getCurrentPosition(userLocated,locationError);

            function userLocated(position)
            {
                var latitude= position.coords.latitude;
                var longitude= position.coords.longitude;


                var map = L.map('map').setView([latitude, longitude], 10);


                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                var searchControl = L.esri.Geocoding.geosearch().addTo(map);

                var results = L.layerGroup().addTo(map);

                searchControl.on('results', function(data){
                    results.clearLayers();
                    for (var i = data.results.length - 1; i >= 0; i--) {
                        results.addLayer(L.marker(data.results[i].latlng));
                    }
                });

            }
            function locationError(error)
            {
                switch(error.code)
                {
                    case error.PERMISSION_DENIED:
                    alert("Permission Denied-"+error.message);
                    break;

                    case error.POSITION_UNAVAILABLE:
                    alert("Position Not Available"+error.message);
                    break;

                    case error.TIMEOUT:
                    alert("Requested "+error.message);
                    break;
                }
            }
        }


    });

}) ;
