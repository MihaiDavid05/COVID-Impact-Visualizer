$(function () {
  // create a colour scale and set manual domain.
  const colorScale = d3.scaleSequentialPow(d3.interpolateReds).exponent(0.5);

  // centre map
  const MAP_CENTER = { lat: 6.518, lng: -0.27, altitude: 2.0 };

  const months = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  }

  // Get paragraph that shows the slider position
  var target = document.querySelector('p#value-time');

  // Define month and year variables
  var month  = parseInt(months[target.innerHTML.split(" ")[0]]);
  var year = parseInt(target.innerHTML.split(" ")[1])

  fetch('res/ne_110m_admin_0_countries_covid_cases.geojson').then(res => res.json()).then(function(countries) {

    // Set domain for color scale and get color: 
    function get_color(colorScale, value, min, max) {
      colorScale.domain([min, max]);
      return colorScale(value)
    }   

    // Set initial properties of the globe
    const world = Globe()
    .backgroundColor('#13142d')
    .polygonAltitude(0.03)
    .polygonsTransitionDuration(300)
    .polygonSideColor(() => 'transparent')
    .polygonStrokeColor(() => '#13142d')
    .polygonsData(countries.features)
    .pointOfView(MAP_CENTER, 10)(document.getElementById('cases'));

    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.0;


    world.width([$('#cases').width()]);
    world.height([$('#cases').height()]);
    $(window).on("resize", function() {
      world.width([$('#cases').width()]);
      world.height([$('#cases').height()]);
    });

    // Disable zoom by default
    world.controls().enableZoom = false;

    $("#cases").on("dblclick", function() {
      world.controls().enableZoom = !world.controls().enableZoom;
    });

    // Get covid cases for heatmap represented at polygon level
    function getCasesHeatmap(feat, selectedYear, selectedMonth) {
      if (feat.properties.hasOwnProperty('covidHeatmapNewCases')) {
        if (feat.properties.covidHeatmapNewCases !== null) {
          let key = `${selectedYear}_${selectedMonth}`
          if (key in feat.properties.covidHeatmapNewCases) {
            if (feat.properties.covidHeatmapNewCases[key] !== null) {
              return feat.properties.covidHeatmapNewCases[key]
            } else {
              return -1
            }
          } else {
            return -1
          }
        }
      } else {
        return -1
      }
    }

    // Get new covid cases represented at polygon level
    function getCasesNew(feat, selectedYear, selectedMonth) {
      if (feat.properties.hasOwnProperty('covidCasesNew')) {
        if (feat.properties.covidCasesNew !== null) {
          let key = `${selectedYear}_${selectedMonth}`
          if (key in feat.properties.covidCasesNew) {
            if (feat.properties.covidCasesNew[key] !== null) {
              return feat.properties.covidCasesNew[key]
            } else {
              return -1
            }
          } else {
            return -1
          }
        }
      } else {
        return -1
      }
    }

    // Get new covid deaths represented at polygon level
    function getDeathsNew(feat, selectedYear, selectedMonth) {
      if (feat.properties.hasOwnProperty('covidDeathsNew')) {
        if (feat.properties.covidDeathsNew !== null) {
          let key = `${selectedYear}_${selectedMonth}`
          if (key in feat.properties.covidDeathsNew) {
            if (feat.properties.covidDeathsNew[key] !== null) {
              return feat.properties.covidDeathsNew[key]
            } else {
              return -1
            }
          } else {
            return -1
          }
        }
      } else {
        return -1
      }
    }

    function getMin(feat, year, month) {
      return feat.properties[`covidHeatmapNewCasesMin_${year}_${month}`]
    }
    function getMax(feat, year, month) {
      return feat.properties[`covidHeatmapNewCasesMax_${year}_${month}`]
    }

    function nFormatter(num, digits) {
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }
    
    

    // Update the globe polygons
    function updateGlobe(world, year, month) {

      world.polygonCapColor(feat => getCasesHeatmap(feat, year, month) === -1 ? 'lightgrey' : get_color(colorScale, getCasesHeatmap(feat, year, month), getMin(feat, year, month), getMax(feat, year, month)))

      // TODO: Put card to the right of the mouse
      world.polygonLabel(
        (d) => {
          const iso_a2 = d.properties.ISO_A2.toUpperCase();
          const flag_emoji = iso_a2.replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
          const countryName = d.properties.NAME;
          const newCasesStr = getCasesNew(d, year, month) === -1 ? 'No Data available' : getCasesNew(d, year, month).toLocaleString("en-US")
          const newDeathsStr = getDeathsNew(d, year, month) === -1 ? 'No Data available' : getDeathsNew(d, year, month).toLocaleString("en-US")
          const population = d.properties.POP_EST
          return `
                  <div class="globe-info-card rounded border p-2 shadow-sm">
                    <span class="h5"><span class="font-weight-bold">${countryName}</span> ${flag_emoji}</span><br/>
                    New monthly cases: ${newCasesStr}<br/>
                    New monthly deaths: ${newDeathsStr}<br/>
                    Est. population: ${nFormatter(population, 2)}
                  </div>
                `
        }
      );

      world.onPolygonHover(hoverD => world
        .polygonAltitude(d => d === hoverD ? 0.05 : 0.03)
        .polygonCapColor(d => d === hoverD ? '#e54765' : getCasesHeatmap(d, year, month) === -1 ? 'lightgrey' : get_color(colorScale, getCasesHeatmap(d, year, month), getMin(d, year, month), getMax(d, year, month)))
      );

      world.polygonsTransitionDuration(200);
    }
    
    // Show initial state of the globe
    updateGlobe(world, year, month)

    
    // Create an observer instance that updates the month and the year variables
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function() {
        month = parseInt(months[target.innerHTML.split(" ")[0]])
        year = parseInt(target.innerHTML.split(" ")[1])
        updateGlobe(world, year, month)
      });    
    });

    // Pass in the target node, as well as the observer options for getting the current year and month
    observer.observe(target, { attributes: true, childList: true, characterData: true });

  })

});