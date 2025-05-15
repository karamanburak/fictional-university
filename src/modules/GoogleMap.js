class GMap {
  constructor() {
    for (const el of document.querySelectorAll(".acf-map")) {
      this.new_map(el);
    }
  }

  new_map($el) {
    const $markers = $el.querySelectorAll(".marker");

    const args = {
      zoom: 16,
      center: new google.maps.LatLng(0, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    const map = new google.maps.Map($el, args);
    map.markers = [];

    // add markers
    for (const marker of $markers) {
      this.add_marker(marker, map);
    }

    // center map
    this.center_map(map);
  }

  add_marker($marker, map) {
    const latlng = new google.maps.LatLng(
      $marker.getAttribute("data-lat"),
      $marker.getAttribute("data-lng")
    );

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: latlng,
      map,
    });

    map.markers.push(marker);

    // if marker contains HTML, add it to an infoWindow
    if ($marker.innerHTML) {
      // create info window
      const infowindow = new google.maps.InfoWindow({
        content: $marker.innerHTML,
      });

      // show info window when marker is clicked
      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    }
  }

  center_map(map) {
    const bounds = new google.maps.LatLngBounds();

    // loop through all markers and create bounds
    for (const marker of map.markers) {
      const latlng = new google.maps.LatLng(
        marker.position.lat(),
        marker.position.lng()
      );

      bounds.extend(latlng);
    }

    // only 1 marker?
    if (map.markers.length === 1) {
      // set center of map
      map.setCenter(bounds.getCenter());
      map.setZoom(16);
    } else {
      // fit to bounds
      map.fitBounds(bounds);
    }
  }
}

export default GMap;
