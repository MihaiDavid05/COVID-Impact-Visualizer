# Process Book (dqw4w9wgxcq)

For our project, *COVID-19 Impact through Data Visualization*, we aim to provide a comprehensive understanding of the pandemic's impact on society through three main aspects: COVID-19 cases and deaths, flights to assess travel in Europe, and the impact of COVID-19 on employment.

## Dataset

We have selected three high-quality datasets for our project, which will serve as the foundation for our analysis.
- [Data on COVID-19 (coronavirus) by Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data)
- [European Flights by Eurocontrol](https://github.com/rfordatascience/tidytuesday/tree/master/data/2022/2022-07-12)
- [Impact of Covid-19 on Employment by ILOSTAT](https://www.kaggle.com/datasets/vineethakkinapalli/impact-of-covid19-on-employment-ilostat)

We have conducted an initial exploratory data analysis of the datasets and have found them to be of high quality. However, the [Data on COVID-19 (coronavirus) by Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data) dataset does not fully reflect reality, because of the way cases and deaths are reported by each country (e.g., "`new_cases` - In rare cases where our source reports a negative daily change due to a data correction, we set this metric to NA").

To further enhance our analysis, we will utilize two additional datasets for the enrichment (e.g., getting airport latitude and longitude, map borders and coutries' flags).
- [IATA/ICAO List by IP2Location](https://github.com/ip2location/ip2location-iata-icao)
- [Countries' Borders on the Globe](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson)
- [Countries' Flags from Kaggle](https://www.kaggle.com/datasets/andreshg/countries-iso-codes-continent-flags-url)
We had to manually replace missing data in the datasets related to countries. For example, we had to add ISO-ALPHA2 codes for some countries and add missing link for the flags (e.g., Bosnia and Herzegovina and Norway).

## Visualizations

We use simple HTML, CSS, and the Bootstrap framework as a backbone, with several libraries enabling visualization and interactiveness. The project can be broken down into the following independent pieces to implement:

### Summary and story line

JQuery, JavaScript

### COVID cases

This section displays global COVID-19 statistics. It begins with a slider created using an SVG component and simple D3 slider tools. The slider ranges from 2020 to 2023, sampled monthly, with a play/pause button located on the left side of the slide bar. Users can either select a specific month and year by dragging the slider or let it run through all the timesteps automatically.

The next element is an interactive 3D globe, created using Globe GL, which displays monthly COVID-19 statistics from 2020 to 2023, selected by the aforementioned slider. The monthly data selected by the slider is bounded to the globe thorugh a MutationObserver interface which provides the ability to watch for changes being made to the slider.

We compute the monthly new cases per capita per country. A heatmap with a suitable color palette highlights the increase or decrease in this number. In this way, the visualization will provide the user with an idea on the monthly impact of COVID among multiple countries. Users can rotate and zoom in/out the globe to better observe different parts of the world.

The globe displays the world's countries using predefined GeoJSON formatted data and the Polygons Layer from Globe GL to define each country's location and appearance. Hovering over a country, while a particular month is selected, displays a pop-up card with monthly information, including the country's flag, new monthly COVID-19 deaths and cases, and population. The country's borders will rise above the original surface of the earth to highlight it.

### Employment

INFOGRAPHIC:
JavaScript, JQuery

### Flights

Map (two comparison panels with flights bubbles for 2019 and 2020):
Leaflet, D3 for charts

## Design decisions

## Challenges

The biggest challenges that we faced were adding responsiveness and setting the interaction with, and between some elements. 

## Contributions

| Ioan Florin Cătălin Nițu | Mihai David | Vuk Vuković |
| ------------------------ | ----------- | ----------- |
|                          |             |             |
|                          |             |             |


3. **Process book** (max 8 pages)
    - Describe the path you took to obtain the final result
    - Explain challenges that you faced and design decisions that you took
    - Reuse the sketches/plans that you made for the first milestone, expanding them and explaining the changes
    - Care about the visual/design of this report
    - Peer assessment: include a breakdown of the parts of the project completed by each team member.