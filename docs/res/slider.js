var margin = { top: 50, right: 50, bottom: 0, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
    }

var formatTickDate = d3.timeFormat("%Y");
var formatTooltipDate = d3.timeFormat("%Y - %B");

// var globeformatTooltipDate = d3.timeFormat("%Y - %m");

var globeformatTooltipDate = (val) => {
    var x = d3.timeFormat("%Y - %m")(val);
    var month = x.split(" ")[2]
    var year = x.split(" ")[0]
    return `Hover on countries to see COVID cases and deaths during ${months[month]} ${year}`
}

var startDate = new Date(2020, 0, 1);
var endDate = new Date(2023, 03, 1);

var moving = false;
var timer;

var tickVals = [0, 1, 2, 3].map(iter => new Date(2020 + iter, 0, 1));

var playButton = d3.select("#play-button");

var sliderTime = d3
    .sliderBottom()
    .min(startDate)
    .max(endDate)
    .step(1000 * 60 * 60 * 24 * 31)
    .width(width + margin.left + margin.right - 20)
    .tickFormat(formatTickDate)
    .tickValues(tickVals)
    .fill('#2196f3')
    .displayFormat(formatTooltipDate)
    .default(startDate)
    .handle(d3.symbol().type(d3.symbolCircle).size(200)())
    .on("drag", function (val) {
        resetTimer();
    })
    .on("onchange", function (val) {
        d3.select(".tick text").attr("opacity", "1");
        d3.select("p#value-time").text(globeformatTooltipDate(val))
    });

var gTime = d3
    .select("div#slider-time")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 92)
    .append("g")
    .attr("transform", "translate(40,30)");

gTime.call(sliderTime);

d3.select("p#value-time").text(globeformatTooltipDate(sliderTime.value()));
d3.select(".parameter-value text").attr("y", "-29");
d3.select(".parameter-value text").attr("x", "5");
d3.select(".parameter-value path").attr("fill", "white");
d3.selectAll(".tick text").style("text-anchor", "start");
d3.selectAll(".tick text").attr("x", "-10");
document.querySelector(".parameter-value path").removeAttribute("tabindex");
d3.select(".parameter-value").attr("y", "-29");


playButton.on("click", function () {
    var button = d3.select(this);
    if (button.html() == '<i class="fa-solid fa-pause"></i>') {
        resetTimer();
    } else {
        moving = true;
        timer = setInterval(update, 500);
        button.html('<i class="fa-solid fa-pause"></i>');
        

    }
});

function update() {
    var offset = sliderTime.value().valueOf() + (1000 * 60 * 60 * 24 * 31);
    sliderTime.value(offset);
    //pause, uncomment to restart
    if (offset >= endDate.valueOf()) {
        // resetTimer();
        sliderTime.value(startDate.valueOf());
    }
}

function resetTimer() {
    moving = false;
    clearInterval(timer);
    playButton.html('<i class="fa-solid fa-play"></i>');
}
