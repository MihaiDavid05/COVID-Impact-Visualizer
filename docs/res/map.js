
$(function () {

    d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/project-2023-dqw4w9wgxcq/master/data/all_agg_flights.csv").then(function(data) {
        // Define a map
        const map = L.map('flights-map', {
            minZoom: 0,
            maxZoom: 10
        }).setView([46.519962, 6.633597], 4);

        map.on('click', function() {
            if (map.scrollWheelZoom.enabled()) {
              map.scrollWheelZoom.disable();
              }
              else {
              map.scrollWheelZoom.enable();
              }
            });
        
        // Define 2 layers
        const osmLayer1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
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

        // Initialize data for the 2 panes
        var circles2019 = [];
        var circles2021 = [];

        function addPoints() {
            data.forEach(function(row) {
                const columns = Object.keys(row)
                row[columns.filter(function(val) { const pattern = /FLT_TOT_1_2018_[0-9]+/; return pattern.test(val); } )]
                // verify for NaN
                if (row.FLT_TOT_1_ORIG_2019 && row.FLT_TOT_1_ORIG_2021){
                    function popupContent() {
                        if (!d3.select('#chart-div-' + row.APT_IATA).empty()) {
                            return
                        }
                        // Create a new chart instance
                        d3.select('#charts').append('div').attr('style', 'width: 400px; height: 300px;').append('canvas').attr('class', 'chart-div').attr('id', 'chart-div-' + row.APT_IATA)
                        // Dummy data
                        var chartData = {
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            datasets: [{
                                label: '2018',
                                data: columns.filter(function(val) {
                                    const pattern = /FLT_TOT_1_2018_[0-9]+/
                                    return pattern.test(val);
                                }).map(function(val) { return row[val] }),
                                fill: false,
                                borderColor: "#e3dd2b",
                                tension: 0.1
                            }, {
                                label: '2019',
                                data: columns.filter(function(val) {
                                    const pattern = /FLT_TOT_1_2019_[0-9]+/
                                    return pattern.test(val);
                                }).map(function(val) { return row[val] }),
                                fill: false,
                                borderColor: "#a0c746",
                                tension: 0.1
                            }, {
                                label: '2020',
                                data: columns.filter(function(val) {
                                    const pattern = /FLT_TOT_1_2020_[0-9]+/
                                    return pattern.test(val);
                                }).map(function(val) { return row[val] }),
                                fill: false,
                                borderColor: "#e68d39",
                                tension: 0.1
                            }, {
                                label: '2021',
                                data: columns.filter(function(val) {
                                    const pattern = /FLT_TOT_1_2021_[0-9]+/
                                    return pattern.test(val);
                                }).map(function(val) { return row[val] }),
                                fill: false,
                                borderColor: "#bf4e32",
                                tension: 0.1
                            }]
                        }
                        const ctx = document.getElementById('chart-div-' + row.APT_IATA).getContext('2d');
                        const myChart = new Chart(ctx, {
                            type: 'line',
                            data: chartData,
                            responsive: true,
                            maintainAspectRatio: false,
                            options: {
                                plugins: {
                                    title: {
                                        display: true,
                                        text: row.APT_AIRPORT
                                    }
                                },
                                legend: { display: false },
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
                                                return value % 10 === 0 ? value + " flights" : '';
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                    const radiusValue2019 = parseFloat(row.FLT_TOT_1_ORIG_2019) / 3
                    // Create circle
                    var circle2019 = L.circle([parseFloat(row.APT_LATITUDE), parseFloat(row.APT_LONGITUDE)], {
                        pane: "left",
                        radius: radiusValue2019,
                        color: "#a0c746"
                    }).addTo(map)   

                    var circleVirtual2019 = L.circle([parseFloat(row.APT_LATITUDE), parseFloat(row.APT_LONGITUDE)], {
                        pane: "left",
                        radius: radiusValue2019 / 5,
                        color: "#fafafa",
                        fill: true,
                        stroke: true,
                        opacity: 0
                    })

                    // Add circle to panes data and map
                    const marker2019 = circleVirtual2019.addTo(map) // TODO: add smaller circle for binding
                    marker2019.once('click', function () {
                        console.log("Clicked")
                        popupContent();
                        marker2019.setPopupContent(document.getElementById('chart-div-' + row.APT_IATA), { maxHeight: 300, maxWidth: 400, minHeight: 300, minWidth: 400 })
                    })
                    .bindPopup("Loading", { maxHeight: 300, maxWidth: 400, minHeight: 300, minWidth: 400 })
                    circles2019.push(circle2019);
                    const radiusValue2021 = parseFloat(row.FLT_TOT_1_ORIG_2021) / 3
                    // Select data for the right pane
                    var circle2021 = L.circle([parseFloat(row.APT_LATITUDE), parseFloat(row.APT_LONGITUDE)], {
                        pane: "right",
                        radius: radiusValue2021,
                        color: "#bf4e32"
                    }).addTo(map)

                    var circleVirtual2021 = L.circle([parseFloat(row.APT_LATITUDE), parseFloat(row.APT_LONGITUDE)], {
                        pane: "right",
                        radius: radiusValue2019 / 5,
                        color: "#fafafa",
                        fill: true,
                        stroke: true,
                        opacity: 0
                    })

                    // Add circle to panes data and map
                    const marker2021 = circleVirtual2021.addTo(map) // TODO: add smaller circle for binding
                    marker2021.once('click', function () {
                        console.log("Clicked")
                        popupContent();
                        marker2021.setPopupContent(document.getElementById('chart-div-' + row.APT_IATA), { maxHeight: 300, maxWidth: 400, minHeight: 300, minWidth: 400 })
                    })
                    .bindPopup("Loading", { maxHeight: 300, maxWidth: 400, minHeight: 300, minWidth: 400 })
                    circles2021.push(circle2021)

                }
            })
        }
        addPoints()
        const compare = L.control.compare(circles2019, circles2021, {
            sliderOrientation: 'vertical',
            position: 'topright'
        }).addTo(map);
    })
});