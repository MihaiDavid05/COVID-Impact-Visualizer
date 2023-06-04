const YEAR_LEFT = "2019";
const YEAR_RIGHT = "2020";
const SCALE_UP_FACTOR = 300;
const YEARS_AVAILABLE = ["2018", "2019", "2020", "2021"]
const COLORS_PER_YEAR = ["#3066BE", "#13142d", "#e54765", "#CFEE9E"]

let total_left_col = "FLT_TOT_1_ORIG_"+YEAR_LEFT
let total_right_col = "FLT_TOT_1_ORIG_"+YEAR_RIGHT

function validate(e) {
    return e.APT_LATITUDE && e.APT_LONGITUDE && e[total_left_col] && e[total_right_col];
}

function plotData(i) {
    const data = flights_data[i];
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: []
    }

    YEARS_AVAILABLE.forEach((year, i) => {
        year_data = []
        for (let month = 1; month <= 12; month++) {
            const field = "FLT_TOT_1_" + year + "_" + month;
            year_data.push(data[field]);
        }

        const obj_data = {
            label: year,
            data: year_data,
            fill: false,
            borderColor: COLORS_PER_YEAR[i],
            tension: 0.1
        }
        chartData.datasets.push(obj_data);
    });

    $("#chart").empty();
    const canvas = $("<canvas/>");
    $("#chart").append(canvas);
    const ctx = canvas[0].getContext('2d');
    const myChart = new Chart(ctx, 
        {
            type: "line",
            data: chartData,
            responsive: true,
            maintainAspectRatio: false,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `Total number of flights at ${data.APT_AIRPORT}`
                    }
                },
                legend: { 
                    labels:{
                        font:{
                            family: "'Figtree', sans-serif"
                        }
                    },
                    display: false },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                return this.getLabelForValue(value);
                            }
                        }
                    },
                    y: {
                        stacked: false,
                        ticks: {
                            callback: function (value, index, values) {
                                return value % 10 === 0 ? value + " flights" : "";
                            }
                        }
                    }
                }
            }
        });
    
}

$(function() {
    flights_data.sort(function(a, b) {
        const keyA = a[total_left_col],
              keyB = b[total_left_col];
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    
    const map = L.map('flights-map', {
        minZoom: 4,
        maxZoom: 12,
        //scrollWheelZoom: false
    }).setView([46.519962, 6.633597], 4);

    //map.on('focus', function() { map.scrollWheelZoom.enable(); });
    //map.on('blur', function() { map.scrollWheelZoom.disable(); });

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

    flights_data.forEach((e, i) => {
        if (!validate(e))
            return;
        
        const leftCircle = L.circle([e.APT_LATITUDE, e.APT_LONGITUDE], {
            pane: "left",
            radius: Math.sqrt(e[total_left_col] / (2 * Math.PI)) * SCALE_UP_FACTOR,
            color: "#151752",
            stroke: false,
            fillOpacity: 0.4
        }).addTo(map);
        leftCircle.on("click", function(e) {
            plotData(i);
            $('#chart-modal').modal('show');
        });
        leftAirports.push(leftCircle);

        const rightCircle = L.circle([e.APT_LATITUDE, e.APT_LONGITUDE], {
            pane: "right",
            radius: Math.sqrt(e[total_right_col] /  (2 * Math.PI)) * SCALE_UP_FACTOR,
            color: "#e54765",
            stroke: false,
            fillOpacity: 0.6
        }).addTo(map);
        rightCircle.on("click", function(e) {
            plotData(i);
            $('#chart-modal').modal('show');
        });
        rightAirports.push(rightCircle);
    });

    leftAirports.push(osmLayerLeft);
    rightAirports.push(osmLayerRight);
    const compare = L.control.compare(leftAirports, rightAirports).addTo(map);
});