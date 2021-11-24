// Const
const FORM = document.querySelector('#form');
const API_KEY_GEOLOCATION = 'at_8fVFRgj29d0wZYsQ5lGFy650uDD8w';

// Let
let ip = document.querySelector('#ipInput');
let ipGeolocationApi = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY_GEOLOCATION}&ipAddress=`;
let urlGeo = ipGeolocationApi;
let ipRes = document.querySelector('#ipRes');
let cityRes = document.querySelector('#cityRes');
let uniCodeRes = document.querySelector('#UCRes');
let postalCodeRes = document.querySelector('#postalCodeRes');
let timezoneRes = document.querySelector('#timezoneRes');
let ispRes = document.querySelector('#ispRes');
let latRes, lngRes, myMap, marker;

function showLocation() {

    myMap.setView([latRes,lngRes], 14);
    marker = L.marker([latRes, lngRes]).addTo(myMap);

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
        maxZoom: 18,
        id: 'mapbox/streets-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2ltb25lbWFuZG9sYSIsImEiOiJja3djYTY3cmkzc3dtMzByb2NnaXFqdGd3In0.LkO9Y9a2d2o50nNLp476eQ'
    }).addTo(myMap);

    // Change marker icon and style
    marker._icon.src = './fonts/icons/uEA02-location.svg';
    marker._icon.style.width = '3rem';
    marker._icon.style.height = 'auto';
    marker._icon.style.marginLeft = '-1.5rem';
    marker._icon.style.marginTop = '-3.06rem';
}

// Get Geolocation on Submit
const getGeolocation = ()=> {

    fetch(urlGeo)
        .then(res => res.json())
        .then(res => {
            ipRes.innerHTML = res.ip;
            cityRes.innerHTML = res.location.city;
            uniCodeRes.innerHTML = res.location.country;
            postalCodeRes.innerHTML = res.location.postalCode;
            timezoneRes.innerHTML = 'UTC' + res.location.timezone;
            ispRes.innerHTML = res.isp;
            latRes = res.location.lat;
            lngRes = res.location.lng;
            showLocation();
        })
        .catch(error => console.log(error));
}

// Get Geolocation On load
window.addEventListener('load', ()=>{

    function getUserPos(position) {
        latRes = position.coords.latitude;
        lngRes = position.coords.longitude;
        myMap = L.map('map').setView([latRes,lngRes], 14);
        showLocation();
    }

    function errorUserPos(error) {
        console.log(error);
    }

    navigator.geolocation.getCurrentPosition(getUserPos, errorUserPos);
});


FORM.addEventListener('submit',(e)=>{

    e.preventDefault();
    urlGeo = ipGeolocationApi + ip.value;
    getGeolocation();
});