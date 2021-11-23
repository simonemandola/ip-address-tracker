// Variables
let ip = document.querySelector('#ipInput');

ip = ip.value

// Map Variables
let mymap = L.map('map').setView([39.483731, -0.362135], 15);
let marker = L.marker([39.483731, -0.362135]).addTo(mymap);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
    maxZoom: 18,
    id: 'mapbox/streets-v8',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2ltb25lbWFuZG9sYSIsImEiOiJja3djYTY3cmkzc3dtMzByb2NnaXFqdGd3In0.LkO9Y9a2d2o50nNLp476eQ'
}).addTo(mymap);

// Change marker icon and style
marker._icon.src = './fonts/icons/uEA02-location.svg';
marker._icon.style.width = '3rem';
marker._icon.style.height = 'auto';
marker._icon.style.marginLeft = '-1.5rem';
marker._icon.style.marginTop = '-3.06rem';