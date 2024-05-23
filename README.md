# OECD Mapbox Project

## Project Overview

The OECD Mapbox project is an interactive map application designed to visualize PM 2.5 pollution data for various urban areas. The application uses Mapbox GL JS for rendering the map, Vue 3 for the front-end framework, and several other tools for data parsing and charting. The project is built and served using Vite, a modern build tool.

## Features

- **Interactive Map**: Displays urban areas with various interactive layers including fill, outline, and centroid layers.
- **Data Visualization**: Shows PM 2.5 levels over time using a line chart.
- **User Interaction**: Updates chart data based on user interaction with the map.
- **Responsive Design**: Ensures a good user experience on different devices.

## Result Preview
Here are some screenshots of the web application:

![Map View](https://github.com/YuhengZhangMelody/OECD-Vue/blob/main/pic/Pasted%20Graphic%20132.png)
*Screenshot showing the map with urban areas in polygon format and the dynamic chart displaying PM 2.5 trends.*

![Chart View](https://github.com/YuhengZhangMelody/OECD-Vue/blob/main/pic/Pasted%20Graphic%20131.png)
*Screenshot showing the average dynamic chart displaying PM 2.5 trends.*


## Tools and Frameworks

- **Vue 3**: Front-end framework for building the user interface.
- **Vite**: Build tool for running the development server and building the project.
- **Mapbox GL JS**: Library for rendering interactive maps.
- **PapaParse**: Library for parsing CSV data.
- **Chart.js**: Library for creating charts.
- **Vite Plugin Static Copy**: Plugin to copy static assets during the build process.
- **D3.js**: Library for data manipulation and visualization.
- **gh-pages**: Tool for deploying the project to GitHub Pages.

## Project Setup

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/YuhengZhangMelody/OECD-Vue.git
   cd OECD-Vue
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

   The development server will start, and you can view the application in your browser at `http://localhost:5173`.

### Build and Deployment

To build the project for production:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

To deploy the project to GitHub Pages:

```sh
npm run deploy
```

## Project Structure

- `src/`
  - `components/`
    - `Map.vue`: Main component containing the map and chart logic.
  - `assets/`
    - `map/`
      - `AFRICAPOLIS2020.geojson`: GeoJSON data for urban areas.
      - `UrbAglo_AQdata.csv`: CSV data for PM 2.5 levels.
- `index.html`: Entry HTML file with CDN links for Mapbox GL JS.
- `vite.config.js`: Vite configuration file.
- `package.json`: Project metadata and scripts.

## How the Map Works

1. **Initialization**:
   - The map is initialized using Mapbox GL JS with a specified style, center, and zoom level.

2. **Loading Data**:
   - GeoJSON data (`AFRICAPOLIS2020.geojson`) is loaded to display urban areas on the map.
   - CSV data (`UrbAglo_AQdata.csv`) is parsed using PapaParse to provide PM 2.5 levels for different urban areas over multiple years.

3. **Rendering Layers**:
   - Several layers are added to the map:
     - **Fill Layer**: Highlights urban areas.
     - **Outline Layer**: Shows boundaries of urban areas.
     - **Centroid Layer**: Marks centroids of urban areas with circles.

4. **Chart Integration**:
   - A line chart is created using Chart.js to visualize PM 2.5 levels over time.
   - Clicking on an urban area updates the chart with specific data for that area.

5. **Reset Functionality**:
   - A reset button allows users to reset the map view and chart to show average PM 2.5 levels for all urban areas.

## Known Issues

- **Build Issues**: There are known issues with packaging the project using Vite. The error `Module name, 'mapbox-gl' does not resolve to a valid URL` occurs during packaging, although the development server (`npm run dev`) works correctly. This problem may be due to an error in the packaging process where vite and mapbox are not compatible.
- **Debugging**: The build issue needs further debugging to resolve the packaging error.

## Future Improvements

- **Resolve Build Issues**: Fix the Vite packaging issues to ensure the project can be built and deployed without errors.
- **Enhance Data Visualization**: Add more interactive and detailed visualizations for better data insights.
- **Optimize Performance**: Improve the performance of the application, especially when handling large datasets.
