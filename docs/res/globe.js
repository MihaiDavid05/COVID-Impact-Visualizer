$(function () {
  // create a colour scale and set manual domain.
  const colorScale = d3.scaleSequentialPow(d3.interpolateReds).exponent(1 / 4);

  // centre map
  const MAP_CENTER = { lat: 6.518, lng: -0.27, altitude: 1.8 };

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
  var month  = parseInt(months[target.innerHTML.split(" ")[11]]);
  var year = parseInt(target.innerHTML.split(" ")[12])

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
      if (feat.properties.hasOwnProperty('covidCasesHeatmap')) {
        if (feat.properties.covidCasesHeatmap !== null) {
          let key = `${selectedYear}_${selectedMonth}`
          if (key in feat.properties.covidCasesHeatmap) {
            if (feat.properties.covidCasesHeatmap[key] !== null) {
              return feat.properties.covidCasesHeatmap[key]
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

    function getMaxOverall(feat) {
      return feat.properties.covidCasesHeatmapMaxOverall
    }
    

    // Update the globe polygons
    function updateGlobe(world, year, month) {

      world.polygonCapColor(feat => getCasesHeatmap(feat, year, month) === -1 ? 'lightgrey' : get_color(colorScale, getCasesHeatmap(feat, year, month), 0, getMaxOverall(feat)))

      // TODO: Put card to the right of the mouse
      world.polygonLabel(
        (d) => {
          const iso_a2 = d.properties.ISO_A2.toUpperCase();
          const flag_emoji = iso_a2.replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
          const countryName = d.properties.NAME;
          const newCasesStr = getCasesNew(d, year, month) === -1 ? 'No Data available' : getCasesNew(d, year, month).toLocaleString("en-US")
          const newDeathsStr = getDeathsNew(d, year, month) === -1 ? 'No Data available' : getDeathsNew(d, year, month).toLocaleString("en-US")
          return `
                  <div class="globe-info-card rounded border p-2 shadow-sm">
                    <span class="h5"><span class="font-weight-bold">${countryName}</span> ${flag_emoji}</span><br/>
                    New monthly cases: ${newCasesStr}<br/>
                    New monthly deaths: ${newDeathsStr}
                  </div>
                `
        }
      );

      world.onPolygonHover(hoverD => world
        .polygonAltitude(d => d === hoverD ? 0.05 : 0.03)
        .polygonCapColor(d => d === hoverD ? '#e54765' : getCasesHeatmap(d, year, month) === -1 ? 'lightgrey' : get_color(colorScale, getCasesHeatmap(d, year, month), 0, getMaxOverall(d)))
      );

      world.polygonsTransitionDuration(200);
    }
    
    // Show initial state of the globe
    updateGlobe(world, year, month)

    
    // Create an observer instance that updates the month and the year variables
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function() {
        month = parseInt(months[target.innerHTML.split(" ")[11]])
        year = parseInt(target.innerHTML.split(" ")[12])
        updateGlobe(world, year, month)
      });    
    });

    // Pass in the target node, as well as the observer options for getting the current year and month
    observer.observe(target, { attributes: true, childList: true, characterData: true });

  })

});