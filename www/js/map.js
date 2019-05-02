$(document).on("pageinit","#map",function(){

    $("#quake").on("change", function(){

        $("#map_container").html('<div id="mapid" style="width: 600px; height: 400px;"></div>');
        $.ajax({
            // URL where to send post and get data
            url: 'get_location.php',
            dataType: "json",
            // method type
            type: 'post',
            // data property of $.ajax is a json (JavaScript Object Notation) of key:value pairs
            data: {
                // selected_text can be considered as a 'name' attribute.
                // Likewise, we can have multiple values
                'selected_text': $(this).val(),
            },
            success: function(data)
            {
                if(navigator.geolocation==undefined)
                {
                    alert("Geolocation undefined");
                }

                else
                {
                    // alert("Geolocation Available");
                    navigator.geolocation.getCurrentPosition(userLocated,locationError);

                    function userLocated(position)
                    {
                        var latitude= data.lati[0];
                        var longitude= data.longi[0];
                        //store the coordinates of latitude and longitude

                        console.log(latitude, longitude);


                        alert("Lat:"+latitude+",Long:"+longitude);

                        var mymap = L.map('mapid').setView([latitude,longitude], 12);
                        // to view the map where the coords are.
                        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
                        {
                            maxZoom: 19,
                            attribution: 'Map data &copy;'+
                            '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>'+
                            'contributors,<a href="https://creativecommons.org/licenses'+
                            '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://'+
                            'www.mapbox.com/">Mapbox</a>',
                            id: 'mapbox.streets',
                            accessToken:'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc'+
                            'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
                        }).addTo(mymap);



                        var marker = L.marker([latitude, longitude]).addTo(mymap);
                        marker.bindPopup("Hospital").openPopup();
                        //to put a marker in the map at the desired place

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
            }
        });
    });


}) ;
