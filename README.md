# Project of Data Visualization (COM-480)

| Student's name           | SCIPER |
| ------------------------ | ------ |
| Ioan Florin Cătălin Nițu | 343298 |
| Mihai David              | 340559 |
| Vuk Vuković              | 338791 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1

Goals and ideas for **COVID-19 Impact through Data Visualization**, analysis of the dataset, description of the problematic, steps for data-cleaning and exploratory data analysis, and a summary of related work.

### Dataset

We have selected three high-quality datasets for our project, which will serve as the foundation for our analysis.
- [Data on COVID-19 (coronavirus) by Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data)
- [European Flights by Eurocontrol](https://github.com/rfordatascience/tidytuesday/tree/master/data/2022/2022-07-12)
- [Impact of Covid-19 on Employment by ILOSTAT](https://www.kaggle.com/datasets/vineethakkinapalli/impact-of-covid19-on-employment-ilostat)

To further enhance our analysis, we will utilize two additional datasets for the enrichment (e.g., calculating the number of cases per 1000 people and getting airport latitude and longitude).
- [Population estimated and projections by The World Bank](https://databank.worldbank.org/source/population-estimates-and-projections/preview/on)
- [IATA/ICAO List by IP2Location](https://github.com/ip2location/ip2location-iata-icao)

We have conducted an initial analysis of the datasets and have found them to be of high quality, with minimal missing values and outliers.

### Problematic

For our project, **COVID-19 Impact through Data Visualization**, we aim to provide a comprehensive understanding of the pandemic's impact on society through three main aspects: COVID-19 cases and deaths, flights to assess travel in Europe, and the impact of COVID-19 on employment. Our primary goal is to create an informative, interactive, and engaging visualization that enables viewers to understand the scale and complexity of the pandemic's impact.

In terms of COVID-19 cases and deaths, we plan to create an interactive 3D heatmap globe to display the data for different countries. This visualization will allow us to analyze the pandemic's development and movement, as well as the different results achieved by countries with different preventative measures. By adding a slider to change the time at which the map is displayed, we can examine how the pandemic has progressed over time.

The impact of COVID-19 on mobility and travel is another significant aspect that we plan to visualize. By using the dataset with flights, we can analyze and visualize how the pandemic has affected the movement of people, with a focus on Europe. The visualization will provide an interactive way to explore the flight data, including the decrease and drop in the number of flights at the beginning of the pandemic.

Finally, we aim to assess the impact of COVID-19 on employment by examining the percentage of lost working hours per country. We plan to use the Impact of COVID-19 on Employment dataset to understand how different COVID-19-related policies, such as lockdowns, work-from-home, and curfews, have impacted employment. By visualizing this indicator for different countries and regions, we can assess the effectiveness of different approaches to managing the pandemic.

### Exploratory Data Analysis

[Exploratory Data Analysis, Preprocessing and Data Cleaning](/data/exploratory_data_analysis.ipynb)

The COVID data is spanning from the beginning of the year 2020 until the end of March 2023 (the start and end day may differ from country to country) and there are 254 countries/regions represented. For each day, and each country we have a list of 67 features, including new cases, total cases, new deaths, total deaths, cases_per_million, and deaths_per_million, which are the columns of interest to us. USA, China, India and France, in that order, have the highest number of COVID deaths until March 2023.

For the population and overall deaths data in 2020, we have 265 countries/regions represented. We compute the `deaths_per year` from the `deaths_per_1000_people` and the `population_per_year`. India, China, USA and Nigeria, in that order, had the most deaths in 2020.

The *European Flights by Eurocontrol* dataset contains features regarding the number of flights for most European airports (identifiable by the ICAO code) between *January 1st, 2016*, to *May 31st, 2022*. There are two sources for the number of IFR flights (for simplicity, commercial flights): one provided by the Network Manager (without missing values) and one by the Airport Operator (containing *~69.72%* missing values, imposing an argument to remove these features).

The dataset is inner-joined with the *IATA/ICAO List by IP2Location* dataset that describes the airports worldwide with details about the location (i.e., `latitude` and `longitude` required for visualizing airports on maps) on the `APT_ICAO` column.

The *Impact of Covid-19 on Employment* dataset comprises a total of 283 data points from 2020, consisting of 189 for countries and 94 for regions. Although the dataset includes eight features, our focus will be on the `percentage_of_working_hrs_lost` attribute, which represents the percentage of hours lost compared to the baseline (the fourth quarter of 2019). Upon examining the data for countries, we observe that the percentage of working hours lost follows a distribution with a mean of 8.8% and a standard deviation of 4.8%.

### Related work

We analysed the following projects and related work to get insights and ideas for our project:
- [COVID Visualizer](https://www.covidvisualizer.com)
- [Then and now: visualizing COVID-19’s impact on air traffic](https://www.flightradar24.com/blog/then-and-now-visualizing-covid-19s-impact-on-air-traffic/)
- [Analysis on Impact of Covid on Employment](https://www.kaggle.com/code/zusmani/analysis-on-impact-of-covid-on-employment)
- [D3.js Geographic Bounding Boxes](https://www.jasondavies.com/maps/bounds/)
- [D3.js Connection map](https://d3-graph-gallery.com/connectionmap.html)

The COVID Visualizer, which displays COVID cases and deaths on an interactive 3D globe, is the primary inspiration for our work. While the dataset for flights in Europe lacks data to build a connection map, this type of visualization would be a valuable addition in case we acquire supplementary data. Additionally, the notebook analyzing the impact of COVID on employment provides a practical starting point for our analysis.

To the best of our knowledge, our approach is original because it combines multiple datasets to provide a comprehensive understanding of the pandemic's impact on society. We will use interactive data visualizations to engage viewers and enable them to understand the scale and complexity of the pandemic's impact.

## Milestone 2

### Overview
For our project, *COVID-19 Impact through Data Visualization*, we aim to provide a comprehensive understanding of the pandemic's impact on society through three main aspects: COVID-19 cases and deaths, flights to assess travel in Europe, and the impact of COVID-19 on employment.

### Functional prototype
Rather than providing visualization sketches and plans, we are excited to share with you a functional prototype (minimum viable product) of our project, which is accessible through our website(https://com-480-data-visualization.github.io/project-2023-dqw4w9wgxcq/) (or our repo directory(docs/index.html) for the code). Please keep in mind that this is only a prototype, and some features may not be working correctly, such as the website not being fully responsive and scrolling issues in some parts of the page. The final product will utilize the provided skeleton and integrate actual data to ensure a seamless user experience.

### Design and implementation
We use simple HTML, CSS, and the Bootstrap framework as a backbone, with several Javascript libraries enabling visualization and interactiveness. The project can be broken down into the following independent pieces to implement:
- A fixed-at-the-top navigation bar with four links (Summary, Cases, Employment, and Flights) that serves as the menu with shortcuts for the four sections of our website.
- The first section and starting point of our website is the Summary. It will display the total COVID deaths and cases through 2 lazy loading increment counters (simple Javascript).
- The second section, Cases, displays global COVID-19 statistics. It begins with a slider created using an SVG component and simple D3 slider tools. The slider ranges from 2020 to 2023, sampled monthly, with a play/pause button located on the left side of the slide bar. Users can either select a specific month and year by dragging the slider or let it run through all the timesteps automatically.
- The interactive 3D globe, created using Globe GL, displays monthly COVID-19 statistics from 2020 to 2023, selected by the aforementioned slider. We compute the total monthly deaths per 1000 people and total monthly COVID-19-related deaths per 1000 people and express the ratio of COVID-19-related deaths from the total deaths. A heatmap with a suitable color palette highlights the increase or decrease in the percentage over time. Users can rotate and zoom in/out of the globe to better observe different parts of the world.
- The globe displays the world's countries using predefined GeoJSON formatted data and the Polygons Layer from Globe GL to define each country's location and appearance. Hovering over a country while a particular month is selected displays a pop-up card with monthly information, including the country's flag, total monthly COVID-19 deaths, cases, and possibly recovered people and vaccination numbers. The country's borders will rise above the original surface of the earth to highlight it.
- The third section, Employment, will showcase the impact of COVID-19 on global employment through interactive infographics created with SVG (using fontawesome components) and Javascript. We'll focus on statistics related to the number of working hours lost and use visual aids (such as infographics displaying 5 out of 100 people) to underscore the significance of this impact.
- The last section of the project, Flights, will illustrate the impact of COVID-19 on flights in Europe. We will display two tiled maps from OpenStreetMap using the Leaflet library side-by-side. Each airport will be represented by a circle whose size corresponds to the airport's traffic (number of flights). Depending on the zooming, the circles will be agregated from airport level to country level. The left map will show traffic from before the pandemic (e.g., March 2019), while the right map will display traffic during the pandemic (e.g., March 2020). We will incorporate a draggable separator using the leaflet-compare library, which enables easy side-by-side comparison of the maps.

### Useful pointers and lectures
- Lecture on Basic web development: better understand the DOM, create the first draft of the project, properly structure HTML and CSS files, SVG and SVG groups as well as their transformations are useful for the slider.
- Lectures on Javascript: introduction to Javascript.
- Lectures on d3.js: use D3 to load data, bind it to the visualization, dynamically manipulate the DOM, build some visualizations (the charts for the flight map) and define interactions and layering at the map/globe level.
- Lecture on Maps: Most of our visualizations include maps (COVID globe and the map with the airport locations).
- Lecture on Storytelling: Properly structure the whole story and narrative that we're trying to communicate through data visualization.
- Globe d3.js: [example](https://ghanadatastuff.com/post/comtradr_data_in_javascript/)
- Infographics icons: [fontawesome](https://fontawesome.com)
- Map provider: [Leaflet](https://leafletjs.com)
- Side-by-side map comparison: [leaflet-compare](https://github.com/phloose/leaflet-compare)

### Extra ideas
- To enhance the introduction and storytelling, we plan to include a timeline that showcases significant events with their respective dates, short descriptions, and photos. For instance, we may include events such as the first reported case, the first case in Europe, and the first vaccine administered. We can draw inspiration from well-designed timelines such as those found in [1](https://webflow.com/made-in-webflow/website/How-it-works-Scroll-into-view) and [2](https://webflow.com/made-in-webflow/website/What-a-year-2020-Covid-19-Timeline).
- In addition to displaying the size of airport bubbles/circles based on traffic on a flight map, we can also plot animated time series that shows the traffic per year for the selected airport. This feature would provide an interactive and informative way for users to explore traffic trends over time.
- Provide users with the option to select the time periods shown on the left and right maps of flight traffic.

## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

