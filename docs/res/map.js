
$(function () {

    d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/project-2023-dqw4w9wgxcq/master/data/agg_flights.csv").then(function(data) {
        
        // Define a map
        const map = L.map('flights-map', {
            minZoom: 0,
            maxZoom: 10
        }).setView([46.519962, 6.633597], 4);
        
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
        var circlesYear1 = [];
        var circlesYear2 = [];
        
        function addPoints(year1, year2) {
            data.forEach(function(row){
                // verify for NaN
                if (row.FLT_TOT_1_ORIG && row.FLT_TOT_1_NORMALIZED){
                    // Select data for the left pane
                    if (parseInt(row.YEAR) === year1) {
                        // Create circle
                        var circle1 = L.circle([parseFloat(row.APT_LATITUDE), parseFloat(row.APT_LONGITUDE)], {
                            pane: "left",
                            // radius: parseFloat(row.FLT_TOT_1_NORMALIZED) * 150000,
                            radius: parseFloat(row.FLT_TOT_1_ORIG) / 3,
                            color: "#0000ff"
                        })
                        // Add circle to panes data and map
                        circle1.addTo(map);
                        circlesYear1.push(circle1);
                    }
                    if (parseInt(row.YEAR) === year2) {
                        // Select data for the right pane
                        var circle2 = L.circle([parseFloat(row.APT_LATITUDE), parseFloat(row.APT_LONGITUDE)], {
                            pane: "right",
                            // radius: parseFloat(row.FLT_TOT_1_NORMALIZED) * 150000,
                            radius: parseFloat(row.FLT_TOT_1_ORIG) / 3,
                            color: "#ff0000"
                        })
                        // Add circle to panes data and map
                        circle2.addTo(map);
                        circlesYear2.push(circle2)


                    }
                }
            })
        }
       
        addPoints(2018, 2021)

        const compare = L.control.compare(circlesYear1, circlesYear2, {
            sliderOrientation: 'vertical',
            position: 'topright'
        }).addTo(map);
    })

    /*

    var chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: '2018',
            data: [8, 13, 7, 9, 4, 6, 8, 10, 12, 15, 17, 20],
            fill: false,
            borderColor: 'blue',
            tension: 0.1
        }, {
            label: '2019',
            data: [5, 10, 5, 7, 3, 5, 7, 9, 11, 13, 16, 19],
            fill: false,
            borderColor: 'green',
            tension: 0.1
        }, {
            label: '2020',
            data: [3, 6, 2, 4, 1, 2, 4, 6, 8, 10, 12, 15],
            fill: false,
            borderColor: 'red',
            tension: 0.1
        }, {
            label: '2021',
            data: [2, 4, 1, 3, 1, 2, 3, 5, 6, 8, 10, 12],
            fill: false,
            borderColor: 'orange',
            tension: 0.1
        }]
    }

    // Create a new chart instance
    const ctx = document.getElementById('chart-div').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
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

    document.getElementById('chart-div').style.display = "initial";
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup(document.getElementById('chart-div'), { maxHeight: 300, maxWidth: 400, minHeight: 300, minWidth: 400 })
        .openPopup()
        .closePopup();
    L.marker([31.5, -0.09]).addTo(map)
        .bindPopup(document.getElementById('chart-div'), { maxHeight: 300, maxWidth: 400, minHeight: 300, minWidth: 400 })
        .openPopup()
        .closePopup();

    */
});