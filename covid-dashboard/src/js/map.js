import L from 'leaflet';
import WorldData from 'geojson-world-map';
export function createMap() {
    var geojson;
    const map = L.map('mapid').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 4,
        minZoom: 1,
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieGlpZm9ybGVhcm5pbmciLCJhIjoiY2tpb3hvejU5MWgyNjJ5cGtiNXpmYjkyMyJ9.uL4-bSH6Y7lxqGNSLaAydw'
    }).addTo(map);
    fetch("https://corona.lmao.ninja/v2/countries")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            let name = `${element.country}`;
            switch (name) {
                case 'USA':
                    name = 'United States';
                    break;
                case 'UK':
                    name = 'United Kingdom';
                    break;
            }

            for (let i = 0; i < WorldData.features.length; i++) {
                if (name === WorldData.features[i].properties.name) {
                    WorldData.features[i].properties.cases = element.cases;
                }
            }
            for (let i = 0; i < WorldData.features.length; i++) {
                if (WorldData.features[i].properties.cases === undefined) {
                    WorldData.features[i].properties.cases = 'No data about this country';
                }
            }
        })
        L.geoJson(WorldData, {style: style}).addTo(map);
        
        geojson = L.geoJson(WorldData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    L.geoJson(WorldData).addTo(map);
    function getColor(d) {
        return d > 1000000 ? '#800026' :
               d > 500000  ? '#BD0026' :
               d > 200000  ? '#E31A1C' :
               d > 100000  ? '#FC4E2A' :
               d > 50000   ? '#FD8D3C' :
               d > 20000   ? '#FEB24C' :
               d > 1000   ? '#FED976' :
                          '#FFEDA0';
    }
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.cases),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7
        };
    }
    function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 3,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        info.update(layer.feature.properties);
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
    var info = L.control();
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); 
        this.update();
        return this._div;
    };

    
    info.update = function (props) {
        this._div.innerHTML = '<h4>World Covid-19 cases</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + `${props.cases} people`
            : 'Hover over a country');
    };

    info.addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1000, 20000, 50000, 100000, 200000, 500000, 1000000],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
}

