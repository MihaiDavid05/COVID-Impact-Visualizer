// create a colour scale and set manual domain.
const colorScale = d3.scaleSequential(d3.interpolateRdYlGn);
colorScale.domain([0, 1]);

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

    // Auto-rotate
    // world.controls().autoRotate = true;
    // world.controls().autoRotateSpeed = 1.8;

    // Function for choosing the covid cases represented at polygon level
    function getCases(feat, selectedYear, selectedMonth) {
      
      // Get covid cases data for a particular feature
      if (feat.properties.hasOwnProperty('covidCases')) {
        if (feat.properties.covidCases !== null) {
          let key = `${selectedYear}_${selectedMonth}`
          if (key in feat.properties.covidCases) {
            return feat.properties.covidCases[key]
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
      world.polygonCapColor(feat => getCases(feat, year, month) === -1 ? 'lightgrey' : colorScale(1 - getCases(feat, year, month)))

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
                      <span style="color:black"><b>Total deaths:</b> ${getCases(d, year, month) === -1 ? 'No Data available' : getCases(d, year, month)} </span><br />
                      <div class="card-spacer"></div>  
                      <span style="color:black"><b>Total vaccinations:</b> ${getCases(d, year, month) === -1 ? 'No Data available' : getCases(d, year, month)}</span><br />
                      <span style="color:black"><b>Total recovered: </b>${getCases(d, year, month) === -1 ? 'No Data available' : getCases(d, year, month)} </span>             
                      <hr />
                    </div>
                    </div>
                `
        }
      );

      world.onPolygonHover(hoverD => world
        .polygonAltitude(d => d === hoverD ? 0.1 : 0.03)
        .polygonCapColor(d => d === hoverD ? 'rgb(0, 0, 255)' : getCases(d, year, month) === -1 ? 'lightgrey' : colorScale(1 - getCases(d, year, month)))
      );

      world.polygonsTransitionDuration(200);

      // // Set other attributes of globe
      world.polygonCapColor(feat => getCases(feat, year, month) === -1 ? 'lightgrey' : colorScale(1 - getCases(feat, year, month)))

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
                      <span style="color:black"><b>Total deaths:</b> ${getCases(d, year, month) === -1 ? 'No Data available' : getCases(d, year, month)} </span><br />
                      <div class="card-spacer"></div>  
                      <span style="color:black"><b>Total vaccinations:</b> ${getCases(d, year, month) === -1 ? 'No Data available' : getCases(d, year, month)}</span><br />
                      <span style="color:black"><b>Total recovered: </b>${getCases(d, year, month) === -1 ? 'No Data available' : getCases(d, year, month)} </span>             
                      <hr />
                    </div>
                    </div>
                `
        }
      );

      world.onPolygonHover(hoverD => world
        .polygonAltitude(d => d === hoverD ? 0.1 : 0.03)
        .polygonCapColor(d => d === hoverD ? 'rgb(0, 0, 255)' : getCases(d, year, month) === -1 ? 'lightgrey' : colorScale(1 - getCases(d, year, month)))
      );

      world.polygonsTransitionDuration(200);
    }
    
    // Show initial state of the globe
    updateGlobe(world, year, month)
    
    // Create an observer instance that updates the month and the year variables
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        month = parseInt(target.innerHTML.split(" ")[2])
        year = parseInt(target.innerHTML.split(" ")[0])
        console.log(year, month)
        updateGlobe(world, year, month)
      });    
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true };

    // Pass in the target node, as well as the observer options for getting the current year and month
    observer.observe(target, config);

    // Can stop observing if we want
    // observer.disconnect();
})