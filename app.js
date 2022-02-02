function initMap(){

    // Map option

    var options = {
        center: {lat: 50.130374 , lng:8.693118 },
        zoom: 100
    }

    //New Map
    map = new google.maps.Map(document.getElementById("map"),options)

    //listen for click on map location

    google.maps.event.addListener(map, "click", (event) => {
        //add Marker
        addMarker({location:event.latLng});
    })



    let MarkerArray = [ {location:{lat: 50.130374, lng: 8.693118}, 
        imageIcon: "https://img.icons8.com/nolan/2x/marker.png", 
        content: `<h2>FRA UAS</h2>`},

        {location:{lat: 50.152651, lng: 8.491664}},

        {location:{lat: 50.152651, lng: 8.491664},content: `<h2>Bad Soden</h2>` }



    ]

    // loop through marker
    for (let i = 0; i < MarkerArray.length; i++){
        addMarker(MarkerArray[i]);

    }

    // Add Marker

    function addMarker(property){

        const marker = new google.maps.Marker({
            position:property.location,
            map:map,
            //icon: property.imageIcon
            });

            // Check for custom Icon

            if(property.imageIcon){
                // set image icon
                marker.setIcon(property.imageIcon)
            }

            if(property.content){

            const detailWindow = new google.maps.InfoWindow({
            content: property.content
    });
    
    marker.addListener("mouseover", () =>{
        detailWindow.open(map, marker);
    })
}

         



    }

    



}