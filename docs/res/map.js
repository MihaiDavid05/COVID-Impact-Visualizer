$(function () {
    var map = L.map('flights-map').setView([50, 10], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 4,
        minZoom: 4
    }).addTo(map);

    // Create a new chart instance
    const ctx = document.getElementById('chart-div').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: '2017',
                data: [12, 19, 3, 5, 2, 3, 5, 7, 9, 12, 15, 18],
                fill: false,
                borderColor: 'purple',
                tension: 0.1
            }, {
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
        },
        options: {
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
});