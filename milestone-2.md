
# Milestone 2

For our project, *COVID-19 Impact through Data Visualization*, we aim to provide a comprehensive understanding of the pandemic's impact on society through three main aspects: COVID-19 cases and deaths, flights to assess travel in Europe, and the impact of COVID-19 on employment.

## Functional prototype
Rather than providing visualization sketches and plans, we are excited to share with you a functional prototype (minimum viable product) of our project, which is accessible through our [website](https://com-480-data-visualization.github.io/project-2023-dqw4w9wgxcq/) (or our [repo directory](docs/index.html) for the code). Please keep in mind that this is only a prototype, and some features may not be working correctly, such as the website not being fully responsive and scrolling issues in some parts of the page. The final product will utilize the provided skeleton and integrate actual data to ensure a seamless user experience.

## Design and implementation
We use simple HTML, CSS, and the Bootstrap framework as a backbone, with several libraries enabling visualization and interactiveness. The project can be broken down into the following independent pieces to implement:
- A fixed-at-the-top navigation bar with five links (Summary, Cases, Employment, and Flights; additionaly an external link to the git repo) that serves as the menu with shortcuts for the four sections of our website. ![Menu](/screenshots/menu.png)
- The first section and starting point of our website is the Summary. It will display the total COVID deaths and cases through 2 lazy loading increment counters (simple JavaScript). ![Summary](/screenshots/summary.png)
- The second section, Cases, displays global COVID-19 statistics. It begins with a slider created using an SVG component and simple D3 slider tools. The slider ranges from 2020 to 2023, sampled monthly, with a play/pause button located on the left side of the slide bar. Users can either select a specific month and year by dragging the slider or let it run through all the timesteps automatically. ![Cases](/screenshots/cases.png)
    - The interactive 3D globe, created using Globe GL, displays monthly COVID-19 statistics from 2020 to 2023, selected by the aforementioned slider. We compute the total monthly deaths per 1000 people and total monthly COVID-19-related deaths per 1000 people and express the ratio of COVID-19-related deaths from the total deaths. A heatmap with a suitable color palette highlights the increase or decrease in the percentage over time. Users can rotate and zoom in/out of the globe to better observe different parts of the world.
    - The globe displays the world's countries using predefined GeoJSON formatted data and the Polygons Layer from Globe GL to define each country's location and appearance. Hovering over a country while a particular month is selected displays a pop-up card with monthly information, including the country's flag, total monthly COVID-19 deaths, cases, and possibly recovered people and vaccination numbers. The country's borders will rise above the original surface of the earth to highlight it.
- The third section, Employment, will showcase the impact of COVID-19 on global employment through interactive infographics created with SVG (using fontawesome components) and JavaScript. We'll focus on statistics related to the number of working hours lost and use visual aids (such as infographics displaying 5 out of 100 people) to underscore the significance of this impact. ![Employment](/screenshots/employment.png)
- The last section of the project, Flights, will illustrate the impact of COVID-19 on flights in Europe. We will display two tiled maps from OpenStreetMap using the Leaflet library side-by-side. Each airport will be represented by a circle whose size corresponds to the airport's traffic (number of flights). Depending on the zooming, the circles will be agregated from airport level to country level. The left map will show traffic from before the pandemic (e.g., March 2019), while the right map will display traffic during the pandemic (e.g., March 2020). We will incorporate a draggable separator using the leaflet-compare library, which enables easy side-by-side comparison of the maps. ![Flights](/screenshots/flights.png)

## Useful pointers and lectures
- Lecture on Basic web development: better understand the DOM, create the first draft of the project, properly structure HTML and CSS files, SVG and SVG groups as well as their transformations are useful for the slider.
- Lectures on JavaScript: introduction to JavaScript.
- Lectures on d3.js: use D3 to load data, bind it to the visualization, dynamically manipulate the DOM, build some visualizations (the charts for the flight map) and define interactions and layering at the map/globe level.
- Lecture on Maps: Most of our visualizations include maps (COVID globe and the map with the airport locations).
- Lecture on Storytelling: Properly structure the whole story and narrative that we're trying to communicate through data visualization.
- Globe d3.js: [example](https://ghanadatastuff.com/post/comtradr_data_in_javascript/)
- Infographics icons: [fontawesome](https://fontawesome.com)
- Map provider: [Leaflet](https://leafletjs.com)
- Side-by-side map comparison: [leaflet-compare](https://github.com/phloose/leaflet-compare)

## Extra ideas
- To enhance the introduction and storytelling, we plan to include a timeline that showcases significant events with their respective dates, short descriptions, and photos. For instance, we may include events such as the first reported case, the first case in Europe, and the first vaccine administered. We can draw inspiration from well-designed timelines such as those found in [1](https://webflow.com/made-in-webflow/website/How-it-works-Scroll-into-view) and [2](https://webflow.com/made-in-webflow/website/What-a-year-2020-Covid-19-Timeline).
- In addition to displaying the size of airport bubbles/circles based on traffic on a flight map, we can also plot animated time series that shows the traffic per year for the selected airport. This feature would provide an interactive and informative way for users to explore traffic trends over time.
- Provide users with the option to select the time periods shown on the left and right maps of flight traffic.
