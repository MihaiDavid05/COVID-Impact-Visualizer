const YEAR_LEFT = 2019;
const YEAR_RIGHT = 2020;
const SCALE_DOWN_FACTOR = 4;

let total_left_col = "FLT_TOT_1_ORIG_"+YEAR_LEFT
let total_right_col = "FLT_TOT_1_ORIG_"+YEAR_RIGHT

function validate(e) {
    return e.APT_LATITUDE && e.APT_LONGITUDE && e[total_left_col] && e[total_right_col];
}

$(function() {
    const map = L.map('flights-map', {
        minZoom: 4,
        maxZoom: 12,
        scrollWheelZoom: false
    }).setView([46.519962, 6.633597], 4);

    map.on('focus', function() { map.scrollWheelZoom.enable(); });
    map.on('blur', function() { map.scrollWheelZoom.disable(); });

    const osmLayerLeft = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: ''
    }).addTo(map);

    // Define 2 layers
    const osmLayerRight = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
    }).addTo(map);

    const osmLayer2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
    }).addTo(map)
    
    // Create 2 separate panes
    map.createPane("left")
    map.createPane("right")

    let leftAirports = []
    let rightAirports = []

    flights_data.forEach(e => {
        if (!validate(e))
            return;
        
        const leftCircle = L.circle([e.APT_LATITUDE, e.APT_LONGITUDE], {
            pane: "left",
            radius: e[total_left_col]/SCALE_DOWN_FACTOR,
            color: "#151752",
            stroke: false,
            fillOpacity: 0.4
        }).addTo(map);
        leftAirports.push(leftCircle);

        const rightCircle = L.circle([e.APT_LATITUDE, e.APT_LONGITUDE], {
            pane: "right",
            radius: e[total_right_col]/SCALE_DOWN_FACTOR,
            color: "#e54765",
            stroke: false,
            fillOpacity: 0.6
        }).addTo(map);
        rightAirports.push(rightCircle);
    });

    leftAirports.push(osmLayerLeft);
    rightAirports.push(osmLayerRight);
    const compare = L.control.compare(leftAirports, rightAirports).addTo(map);
});