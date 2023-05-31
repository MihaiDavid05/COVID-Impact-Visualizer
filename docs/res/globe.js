$(function () {
  // create a colour scale and set manual domain.
  const colorScale = d3.scaleSequentialPow(d3.interpolateYlOrRd).exponent(1 / 4);

  // centre map
  const MAP_CENTER = { lat: 6.518, lng: -0.27, altitude: 1.8 };

  // assign url where to find flag
  const flagEndpoint = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-dqw4w9wgxcq/master/data/flags';
  const extension = 'svg';

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
  var month  = parseInt(months[target.innerHTML.split(" ")[10]]);
  var year = parseInt(target.innerHTML.split(" ")[11])

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
    .polygonSideColor(() => 'rgba(0, 50, 50, 0.5)')
    .polygonStrokeColor(() => 'green')
    .polygonsData(countries.features)
    .pointOfView(MAP_CENTER, 10)(document.getElementById('cases'));

    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.0;
    // TODO: Here
    world.controls().enableZoom = false;

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

    function getMin(feat) {
      return feat.properties.covidCasesHeatmapMin
    }

    function getMax(feat) {
      return feat.properties.covidCasesHeatmapMax
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
          const flagName = d.properties.ISO_A2.toLowerCase();
          const labelX = +100
          const labelY = -200
          return `
                    <div class="card" style="left: ${labelX}px; top: ${labelY}px;">
                    <img class="card-img" src="${flagEndpoint}/${flagName}.${extension}" alt="flag" height="100" width="50" />
                    <div class="container">
                    <span class="card-title", style="color:black; font-family: comic sans ms, cursive;">${d.properties.NAME}</span> <br />
                    <div class="card-spacer"></div>
                      <div class="card-spacer"></div>
                      <span style="color:black; font-family: comic sans ms, cursive"><b>Monthly deaths:</b> ${getDeathsNew(d, year, month) === -1 ? 'No Data available' : getDeathsNew(d, year, month).toLocaleString("en-US")} </span>
                      <div class="card-spacer"></div>  
                      <span style="color:black; font-family: comic sans ms, cursive;"><b>Monthly cases:</b> ${getCasesNew(d, year, month) === -1 ? 'No Data available' : getCasesNew(d, year, month).toLocaleString("en-US")}</span>
                    </div>
                    </div>
                `
        }
      );

      world.onPolygonHover(hoverD => world
        .polygonAltitude(d => d === hoverD ? 0.15 : 0.03)
        .polygonCapColor(d => d === hoverD ? 'rgb(149, 216, 239)' : getCasesHeatmap(d, year, month) === -1 ? 'lightgrey' : get_color(colorScale, getCasesHeatmap(d, year, month), 0, getMaxOverall(d)))
      );

      world.polygonsTransitionDuration(200);
    }
    
    // Show initial state of the globe
    updateGlobe(world, year, month)

    
    // Create an observer instance that updates the month and the year variables
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function() {
        month = parseInt(months[target.innerHTML.split(" ")[10]])
        year = parseInt(target.innerHTML.split(" ")[11])
        updateGlobe(world, year, month)
      });    
    });

    // Pass in the target node, as well as the observer options for getting the current year and month
    observer.observe(target, { attributes: true, childList: true, characterData: true });

  })

});