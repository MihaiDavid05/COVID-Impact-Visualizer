// create a colour scale
const colorScale = d3.scaleSequentialPow(d3.interpolateGnBu).exponent(0.15);

// centre map
const MAP_CENTER = { lat: 6.518, lng: -0.27, altitude: 1.8 };

// assign url where to find flags
const flagEndpoint = 'https://corona.lmao.ninja/assets/img/flags';

// load in the geojson data
const getVal = feat => feat.properties.Total;
fetch('res/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries => {

  // Set manual domain.
  colorScale.domain([0, 4345000000]);

  const world = Globe()
    // add a nice night sky
    .backgroundColor('#13142d')
    .polygonsData(countries.features)
    .polygonAltitude(0.03)
    .polygonCapColor(feat => getVal(feat) === -1 ? 'lightgrey' : colorScale(getVal(feat)))
    .polygonSideColor(() => 'rgba(0, 50, 50, 0.5)')
    .polygonStrokeColor(feat => 'green')
    .polygonLabel(
      ({ properties: d, covidData: c }) => {
        const flagName = d.ISO_A2.toLowerCase();
        return `
<div class="card">
<img class="card-img" src="${flagEndpoint}/${flagName}.png" alt="flag" />
<div class="container">
<span class="card-title", style="color:black">${d.NAME}</span> <br />
<div class="card-spacer"></div>
   <hr />
   <div class="card-spacer"></div>
   <span style="color:black"><b>Total deaths:</b> ${d.Total === -1 ? 'No Data available' : 9010} </span><br />
   <div class="card-spacer"></div>  
   <span style="color:black"><b>Total vaccinations:</b> ${d.Import_trade_value_usd === -1 ? 'No Data available' : 1234}</span><br />
   <span style="color:black"><b>Total recovered: </b>${d.Import_trade_value_usd === -1 ? 'No Data available' : 5678} </span>             
   <hr />
</div>
</div>
`
      }
    )
    .onPolygonHover(hoverD => world
      .polygonAltitude(d => d === hoverD ? 0.1 : 0.03)
      .polygonCapColor(d => d === hoverD ? 'rgb(255, 0, 0)' : getVal(d) === -1 ? 'lightgrey' : 'rgb(255, 255, 255)')
    )
    .polygonsTransitionDuration(200)
    .pointOfView(MAP_CENTER, 10)
    (document.getElementById('cases'))
  document.getElementById('cases').getElementsByTagName('canvas')[0].height = 0.7 * window.innerHeight
})