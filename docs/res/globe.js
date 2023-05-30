// create a colour scale and set manual domain.
const colorScale = d3.scaleSequential(d3.interpolateRdYlGn);

// centre map
const MAP_CENTER = { lat: 6.518, lng: -0.27, altitude: 1.8 };

// assign url where to find flags
const flagEndpoint = 'https://corona.lmao.ninja/assets/img/flags';

// Get paragraph that shows the slider position
var target = document.querySelector('p#value-time');

// Define month and year variables
var month  = parseInt(target.innerHTML.split(" ")[2]);
var year = parseInt(target.innerHTML.split(" ")[0])


fetch('res/ne_110m_admin_0_countries_covid_cases.geojson').then(res => res.json()).then(function(countries) {

    // Set initial properties of the globe
    const world = Globe()
    .backgroundColor('#13142d')
    .polygonAltitude(0.03)
    .polygonSideColor(() => 'rgba(0, 50, 50, 0.5)')
    .polygonStrokeColor(() => 'green')
    .polygonsData(countries.features)
    .pointOfView(MAP_CENTER, 10)(document.getElementById('cases'));

    // Set domain for color scale: 
    // TODO
    colorScale.domain([0, 2]);

    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.0;

    // Function to get covid cases for heatmap represented at polygon level
    function getCasesHeatmap(feat, selectedYear, selectedMonth) {
      if (feat.properties.hasOwnProperty('covidCasesHeatmap')) {
        if (feat.properties.covidCasesHeatmap !== null) {
          let key = `${selectedYear}_${selectedMonth}`
          if (key in feat.properties.covidCasesHeatmap) {
            return feat.properties.covidCasesHeatmap[key]
          } else {
            return -1
          }
        }
      } else {
        return -1
      }
    }

    // Function to get new covid cases represented at polygon level
    function getCasesNew(feat, selectedYear, selectedMonth) {
      if (feat.properties.hasOwnProperty('covidCasesNew')) {
        if (feat.properties.covidCasesNew !== null) {
          let key = `${selectedYear}_${selectedMonth}`
          if (key in feat.properties.covidCasesNew) {
            return feat.properties.covidCasesNew[key]
          } else {
            return -1
          }
        }
      } else {
        return -1
      }
    }

    // Function to get new covid deaths represented at polygon level
    function getDeathsNew(feat, selectedYear, selectedMonth) {
      if (feat.properties.hasOwnProperty('covidDeathsNew')) {
        if (feat.properties.covidDeathsNew !== null) {
          let key = `${selectedYear}_${selectedMonth}`
          if (key in feat.properties.covidDeathsNew) {
            return feat.properties.covidDeathsNew[key]
          } else {
            return -1
          }
        }
      } else {
        return -1
      }
    }
    

    // Function to update the globe polygons
    function updateGlobe(world, year, month) {

      world.polygonCapColor(feat => getCasesHeatmap(feat, year, month) === -1 ? 'lightgrey' : colorScale(getCasesHeatmap(feat, year, month)))

      world.polygonLabel(
        (d) => {
          const flagName = d.properties.ISO_A2.toLowerCase();
          return `
                    <div class="card">
                    <img class="card-img" src="${flagEndpoint}/${flagName}.png" alt="flag" />
                    <div class="container">
                    <span class="card-title", style="color:black">${d.properties.NAME}</span> <br />
                    <div class="card-spacer"></div>
                      <hr />
                      <div class="card-spacer"></div>
                      <span style="color:black"><b>Monthly deaths:</b> ${getDeathsNew(d, year, month) === -1 ? 'No Data available' : getDeathsNew(d, year, month)} </span><br />
                      <div class="card-spacer"></div>  
                      <span style="color:black"><b>Monthly cases:</b> ${getCasesNew(d, year, month) === -1 ? 'No Data available' : getCasesNew(d, year, month)}</span><br />
                      <hr />
                    </div>
                    </div>
                `
        }
      );

      world.onPolygonHover(hoverD => world
        .polygonAltitude(d => d === hoverD ? 0.1 : 0.03)
        .polygonCapColor(d => d === hoverD ? 'rgb(0, 0, 255)' : getCasesHeatmap(d, year, month) === -1 ? 'lightgrey' : colorScale(getCasesHeatmap(d, year, month)))
      );

      world.polygonsTransitionDuration(200);
    }
    
    // Show initial state of the globe
    updateGlobe(world, year, month)
    
    // Create an observer instance that updates the month and the year variables
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        month = parseInt(target.innerHTML.split(" ")[2])
        year = parseInt(target.innerHTML.split(" ")[0])
        updateGlobe(world, year, month)
      });    
    });

    // Pass in the target node, as well as the observer options for getting the current year and month
    observer.observe(target, { attributes: true, childList: true, characterData: true });

    // Can stop observing if we want
    // observer.disconnect();
})