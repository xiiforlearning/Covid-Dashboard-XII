import L from 'leaflet';
export function map() {
    const mymap = L.map('mapid').setView([35, 70], 3);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieGlpZm9ybGVhcm5pbmciLCJhIjoiY2tpb3hvejU5MWgyNjJ5cGtiNXpmYjkyMyJ9.uL4-bSH6Y7lxqGNSLaAydw'
    }).addTo(mymap);
}