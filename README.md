# Project of Data Visualization (COM-480)

| Student's name           | SCIPER |
| ------------------------ | ------ |
| Ioan Florin Cătălin Nițu | 343298 |
| Mihai David              | 340559 |
| Vuk Vuković              | 338791 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (7th April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

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

For our project, _**COVID-19 impact through data visualization**_, we aim to provide a comprehensive understanding of the pandemic's impact on society through three main aspects: COVID-19 cases and deaths, flights to assess travel in Europe, and the impact of COVID-19 on employment. Our primary goal is to create an informative, interactive, and engaging visualization that enables viewers to understand the scale and complexity of the pandemic's impact.

In terms of COVID-19 cases and deaths, we plan to create an interactive 3D heatmap globe to display the data for different countries. This visualization will allow us to analyze the pandemic's development and movement, as well as the different results achieved by countries with different preventative measures. By adding a slider to change the time at which the map is displayed, we can examine how the pandemic has progressed over time.

The impact of COVID-19 on mobility and travel is another significant aspect that we plan to visualize. By using the dataset with flights, we can analyze and visualize how the pandemic has affected the movement of people, with a focus on Europe. The visualization will provide an interactive way to explore the flight data, including flight cancellations and reductions.

Finally, we aim to assess the impact of COVID-19 on employment by examining the percentage of lost working hours per country. We plan to use the Impact of COVID-19 on Employment dataset to understand how different COVID-19-related policies, such as lockdowns, work-from-home, and curfews, have impacted employment. By visualizing this indicator for different countries and regions, we can assess the effectiveness of different approaches to managing the pandemic.

### Exploratory Data Analysis

[Exploratory Data Analysis, Preprocessing and Data Cleaning](/data/exploratory_data_analysis.ipynb)

The COVID data is spanning from the beginning of the year 2020 until the end of March 2023 (the start and end day may differ from country to country) and there are 254 countries/regions represented. For each day, and each country we have a list of 67 features, including new cases, total cases, new deaths, total deaths, cases_per_million, and deaths_per_million, which are the columns of interest to us. USA, China, India and France, in that order, have the highest number of COVID deaths until March 2023.

For the population and overall deaths data in 2020, we have 265 countries/regions represented. We compute the `deaths_per year` from the `deaths_per_1000_people` and the `population_per_year`. India, China, USA and Nigeria, in that order, had the most deaths in 2020.

The *European Flights by Eurocontrol* dataset contains features regarding the number of flights for most European airports (identifiable by the ICAO code) between *January 1st, 2016*, to *May 31st, 2022*. There are two sources for the number of IFR flights (for simplicity, commercial flights): one provided by the Network Manager (without missing values) and one by the Airport Operator (containing *~69.72%* missing values, imposing an argument to remove these features).

The dataset is inner-joined with the *IATA/ICAO List by IP2Location* dataset that describes the airports worldwide with details about the location (i.e., `latitude` and `longitude` required for visualizing airports on maps) on the `APT_ICAO` column.

The *Impact of Covid-19 on Employment* dataset comprises a total of 283 data points from 2020, consisting of 189 for countries and 94 for regions. Although the dataset includes eight features, our focus will be on the `percentage_of_working_hrs_lost` attribute, which represents the percentage of hours lost compared to the baseline (the fourth quarter of 2019). Upon examining the data for countries, we observe that the percentage of working hours lost follows a distribution with a mean of 8.8% and a standard deviation of 4.8%.

### Related work


- [COVID Visualizer](https://www.covidvisualizer.com)
- [Then and now: visualizing COVID-19’s impact on air traffic](https://www.flightradar24.com/blog/then-and-now-visualizing-covid-19s-impact-on-air-traffic/)
- [Analysis on Impact of Covid on Employment](https://www.kaggle.com/code/zusmani/analysis-on-impact-of-covid-on-employment)
- [D3.js Geographic Bounding Boxes](https://www.jasondavies.com/maps/bounds/)
- [D3.js Connection map](https://d3-graph-gallery.com/connectionmap.html)

To the best of our knowledge, our approach is original because it combines multiple datasets to provide a comprehensive understanding of the pandemic's impact on society. We will use interactive data visualizations to engage viewers and enable them to understand the scale and complexity of the pandemic's impact.

## Milestone 2 (7th May, 5pm)

**10% of the final grade**


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

