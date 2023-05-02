// create a colour scale
const colorScale = d3.scaleSequentialPow(d3.interpolateGnBu).exponent(0.15);

// centre map at Ghana
const MAP_CENTER = { lat: 6.518, lng: -0.27, altitude: 1.8 };

// assign url where to find flags
const flagEndpoint = 'https://corona.lmao.ninja/assets/img/flags';

// load in the geojson data
// and set feature I want to plot (trade value)
const getVal = feat => feat.properties.Total;
fetch('res/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries => {

  //const maxVal = Math.max(...countries.features.map(getVal));

  // I have to make sure that in the colour scale I do not include the World Total (Ghana).
  // So, I am setting a manual domain.
  colorScale.domain([0, 4345000000]);

  const world = Globe()
    // by default there is a little map image overlaid, but I do not need that
    //.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    // add a nice night sky
    .backgroundColor('#13142d')
    // .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .polygonsData(countries.features)
    .polygonAltitude(0.03)
    // make countries without data light grey and make Ghana the red colour of the Ghanaian flag
    .polygonCapColor(feat => feat.properties.NAME === "Ghana" ? 'rgb(206, 17, 38)' : getVal(feat) === -1 ? 'lightgrey' : colorScale(getVal(feat)))
    .polygonSideColor(() => 'rgba(0, 50, 50, 0.5)')
    .polygonStrokeColor(feat => feat.properties.NAME === "Ghana" ? 'rgb(252, 209, 22)' : 'green')
    .polygonLabel(
      ({ properties: d, covidData: c }) => {
        const flagName = d.ISO_A2.toLowerCase();
        return `
<div class="card">
<img class="card-img" src="${flagEndpoint}/${flagName}.png" alt="flag" />
<div class="container">
<span class="card-title">${d.NAME}</span> <br />
<div class="card-spacer"></div>
   <hr />
   <div class="card-spacer"></div>
   <span><b>Total Trade:</b> ${d.Total === -1 ? 'No Data available' : d3.format('.4s')(d.Total).replace(/G/, "B USD").replace(/M/, "M USD").replace(/k/, "k USD")} </span><br />
   <span><b>Total Export:</b> ${d.Export === -1 ? 'No Data available' : d3.format('.4s')(d.Export).replace(/G/, "B USD").replace(/M/, "M USD").replace(/k/, "k USD")} </span> <br />
   <span><b>Total Import:</b> ${d.Import === -1 ? 'No Data available' : d3.format('.4s')(d.Import).replace(/G/, "B USD").replace(/M/, "M USD").replace(/k/, "k USD")} </span>

   <div class="card-spacer"></div>
   <hr />
   <div class="card-spacer"></div>
   <span><b>Largest Export:</b> ${d.Export_trade_value_usd === -1 ? 'No Data available' : d.Export_commodity}</span><br />
   <span><b>Value largest Export: </b>${d.Export_trade_value_usd === -1 ? 'No Data available' : d3.format('.4s')(d.Export_trade_value_usd).replace(/G/, "B USD").replace(/M/, "M USD").replace(/k/, "k USD")} </span><br /><br />             
   <span><b>Largest Import:</b> ${d.Import_trade_value_usd === -1 ? 'No Data available' : d.Import_commodity}</span><br />
   <span><b>Value largest Import: </b>${d.Import_trade_value_usd === -1 ? 'No Data available' : d3.format('.4s')(d.Import_trade_value_usd).replace(/G/, "B USD").replace(/M/, "M USD").replace(/k/, "k USD")} </span>             

</div>
</div>
`
      }
    )
    .onPolygonHover(hoverD => world
      .polygonAltitude(d => d === hoverD ? 0.1 : 0.03)
      .polygonCapColor(d => d === hoverD ? 'rgb(255, 0, 0)' : getVal(d) === -1 ? 'lightgrey' : d.properties.NAME === "Ghana" ? 'rgb(206, 17, 38)' : colorScale(getVal(d)))
    )
    .polygonsTransitionDuration(200)
    .pointOfView(MAP_CENTER, 10)
    (document.getElementById('cases'))
})