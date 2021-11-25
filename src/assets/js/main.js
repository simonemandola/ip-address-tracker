// Const
const FORM = document.querySelector('#form');
const LOADING = document.querySelector('#loading');
const API_KEY_GEOLOCATION = 'at_8fVFRgj29d0wZYsQ5lGFy650uDD8w';
const BY_IP = 'ipAddress=';
const BY_DOMAIN = 'domain=';
const BY_EMAIL = 'email=';

// Let
let ip = document.querySelector('#ipInput');
let ipGeolocationApi = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY_GEOLOCATION}&`;
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
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>' +
            ' contributors, Imagery © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
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

    LOADING.style.visibility = 'visible';
    LOADING.style.opacity = '1';

    fetch(urlGeo)
        .then(res => res.json())
        .then(res => {
            ipRes.innerHTML = res.ip;
            cityRes.innerHTML = res.location.city + ', ';
            uniCodeRes.innerHTML = res.location.country + ', ';
            postalCodeRes.innerHTML = res.location.postalCode;
            timezoneRes.innerHTML = 'UTC' + res.location.timezone;
            ispRes.innerHTML = res.isp;
            latRes = res.location.lat;
            lngRes = res.location.lng;
            LOADING.style.visibility = 'hidden';
            LOADING.style.opacity = '0';
            showLocation();
        })
        .catch(error => {
            console.log(error);
            alert('Insert valid IP, domain or email!');
            LOADING.style.visibility = 'hidden';
            LOADING.style.opacity = '0';
            myMap.setView([latRes,lngRes], 12);
        });
}

function userGeoOnLoad() {

    function getUserPos(position) {
        latRes = position.coords.latitude;
        lngRes = position.coords.longitude;
        myMap = L.map('map').setView([latRes,lngRes], 14);
        getGeolocation();
    }

    function errorUserPos(error) {
        console.log(error);
    }

    navigator.geolocation.getCurrentPosition(getUserPos, errorUserPos);
}

function ipFailed() {
    alert('Insert valid IP, domain or email! 99999999999');
}

// Get Geolocation On load
window.addEventListener('load', userGeoOnLoad);

// Event listener on form submit
FORM.addEventListener('submit',(e)=>{

    e.preventDefault();
    ip.value = ip.value.trim().toLowerCase();

    if(ip.value.includes('www.')) {
        urlGeo = ipGeolocationApi + BY_DOMAIN + ip.value;
        getGeolocation();
    } else if (ip.value.includes('@')) {
        urlGeo = ipGeolocationApi + BY_EMAIL + ip.value;
        getGeolocation();
    } else if (ip.value === "") {
        return ipFailed();
    } else {
        urlGeo = ipGeolocationApi + BY_IP + ip.value;
        getGeolocation();
    }

    ip.value = ""
});