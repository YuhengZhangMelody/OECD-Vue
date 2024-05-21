  <!-- <template>
    <div>
      <div id="map" style="height: 100vh;"></div>
      <div class="chart-container">
        <h2>PM 2.5 for <span>{{ cityName }}</span></h2>
        <button id="reset-btn" @click="resetChart">Reset</button>
        <p>Insights from the table</p>
        <canvas ref="chart" id="chart" width="400" height="200"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import Papa from 'papaparse';
  import Chart from 'chart.js/auto';
  import geojsonData from '@/assets/map/AFRICAPOLIS2020.geojson';
  import csvFile from '@/assets/map/UrbAglo_AQdata.csv';
  
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  
  export default {
    name: 'Map',
    data() {
      return {
        map: null,
        chart: null,
        chartData: [],
        cityName: 'All Cities',
      };
    },
    mounted() {
      this.initMap();
      this.loadCSVData();
    },
    methods: {
      initMap() {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [0, 0],
          zoom: 2,
        });
  
        this.map.on('load', () => {
          this.loadGeoJSONData();
        });
      },
      loadGeoJSONData() {
        this.map.addSource('urban-areas', {
          type: 'geojson',
          data: geojsonData,
        });
  
        this.map.addLayer({
          id: 'urban-areas-fill',
          type: 'fill',
          source: 'urban-areas',
          paint: {
            'fill-color': '#888888',
            'fill-opacity': 0.4,
          },
          minzoom: 8,
        });
  
        this.map.addLayer({
          id: 'urban-areas-outline',
          type: 'line',
          source: 'urban-areas',
          paint: {
            'line-color': '#000000',
            'line-width': 2,
          },
          minzoom: 8,
        });
  
        this.map.addLayer({
          id: 'urban-areas-centroids',
          type: 'circle',
          source: 'urban-areas',
          paint: {
            'circle-radius': 6,
            'circle-color': '#B42222',
          },
          maxzoom: 10,
        });
  
        this.map.on('click', 'urban-areas-fill', (e) => {
          const city =  e.features[0].properties.agglosName;
          this.updateChartData(city);
        });
      },
      loadCSVData() {
        // Load and parse the CSV data
        fetch(csvFile)
          .then(response => response.text())
          .then(csvText => {
            Papa.parse(csvText, {
              header: true,
              complete: (results) => {
                this.chartData = results.data;
                this.updateChartData();
              },
            });
          });
      },
      updateChartData(city = null) {
        const years = Array.from({ length: 23 }, (_, i) => 1998 + i);
        const values = years.map((year) => {
          const yearField = `X${year}`;
          if (city) {
            const cityData = this.chartData.find((d) => d.Agglomeration_Name === city);
            return cityData ? parseFloat(cityData[yearField]) : 0;
          } else {
            const total = this.chartData.reduce((sum, d) => sum + parseFloat(d[yearField]), 0);
            return total / this.chartData.length;
          }
        });
  
        this.cityName = city || 'All Cities';
  
        if (this.chart) {
          this.chart.destroy();
        }
  
        const ctx = this.$refs.chart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: years,
            datasets: [
              {
                label: 'PM 2.5 Levels',
                data: values,
                borderColor: '#42A5F5',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      resetChart() {
        // Reset map to initial center and zoom level
        this.map.flyTo({
          center: [0, 0],
          zoom: 2
        });
  
        // Reset chart to show average PM 2.5 levels for all urban areas
        const averages = {};
        this.chartData.forEach((row) => {
          for (let year = 1998; year <= 2020; year++) {
            if (!averages[year]) averages[year] = [];
            averages[year].push(parseFloat(row[`X${year}`]) || 0);
          }
        });
  
        for (let year in averages) {
          const sum = averages[year].reduce((a, b) => a + b, 0);
          averages[year] = sum / averages[year].length;
        }
  
        // Update the chart with average data
        this.updateChartData(null);
      },
    },
  };
  </script>
  
  <style>
  #app {
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
  }
  
  #map {
    height: 100%;
    width: 100%;
  }
  
  .chart-container {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 400px; /* Set a fixed width for the chart container */
    background: rgba(255, 255, 255, 0.9);
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  
  .chart-container h2 {
    display: inline-block;
    margin: 0;
    font-size: 1.5em;
  }
  
  .chart-container h2 span {
    color: #42A5F5;
  }
  
  .chart-container button {
    float: right;
    background: #42A5F5;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .chart-container button:hover {
    background: #357ABD;
  }
  
  .chart-container p {
    margin: 5px 0;
    color: #555;
  }
  
  .chart-container canvas {
    width: 100% !important;
    height: auto !important;
  }
  </style> -->
















  <template>
    <div>
      <div id="map" style="height: 100vh;"></div>
      <div class="chart-container">
        <h2>PM 2.5 for <span>{{ cityName }}</span></h2>
        <button id="reset-btn" @click="resetChart">Reset</button>
        <p>Insights from the table</p>
        <canvas ref="chart" id="chart" width="400" height="200"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import 'mapbox-gl/dist/mapbox-gl.css';
  import Papa from 'papaparse';
  import Chart from 'chart.js/auto';
  import geojsonData from '@/assets/map/AFRICAPOLIS2020.geojson';
  import csvFile from '@/assets/map/UrbAglo_AQdata.csv';
  
  export default {
    name: 'Map',
    data() {
      return {
        map: null,
        chart: null,
        chartData: [],
        cityName: 'All Cities',
      };
    },
    mounted() {
      this.initMap();
      this.loadCSVData();
    },
    methods: {
      async initMap() {
        const mapboxgl = await import('mapbox-gl');
        mapboxgl.default.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  
        this.map = new mapboxgl.default.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [0, 0],
          zoom: 2,
        });
  
        this.map.on('load', () => {
          this.loadGeoJSONData();
        });
      },
      loadGeoJSONData() {
        this.map.addSource('urban-areas', {
          type: 'geojson',
          data: geojsonData,
        });
  
        this.map.addLayer({
          id: 'urban-areas-fill',
          type: 'fill',
          source: 'urban-areas',
          paint: {
            'fill-color': '#888888',
            'fill-opacity': 0.4,
          },
          minzoom: 8,
        });
  
        this.map.addLayer({
          id: 'urban-areas-outline',
          type: 'line',
          source: 'urban-areas',
          paint: {
            'line-color': '#000000',
            'line-width': 2,
          },
          minzoom: 8,
        });
  
        this.map.addLayer({
          id: 'urban-areas-centroids',
          type: 'circle',
          source: 'urban-areas',
          paint: {
            'circle-radius': 6,
            'circle-color': '#B42222',
          },
          maxzoom: 10,
        });
  
        this.map.on('click', 'urban-areas-fill', (e) => {
          const city = e.features[0].properties.agglosName;
          this.updateChartData(city);
        });
      },
      loadCSVData() {
        fetch(csvFile)
          .then(response => response.text())
          .then(csvText => {
            Papa.parse(csvText, {
              header: true,
              complete: (results) => {
                this.chartData = results.data;
                this.updateChartData();
              },
            });
          });
      },
      updateChartData(city = null) {
        const years = Array.from({ length: 23 }, (_, i) => 1998 + i);
        const values = years.map((year) => {
          const yearField = `X${year}`;
          if (city) {
            const cityData = this.chartData.find((d) => d.Agglomeration_Name === city);
            return cityData ? parseFloat(cityData[yearField]) : 0;
          } else {
            const total = this.chartData.reduce((sum, d) => sum + parseFloat(d[yearField]), 0);
            return total / this.chartData.length;
          }
        });
  
        this.cityName = city || 'All Cities';
  
        if (this.chart) {
          this.chart.destroy();
        }
  
        const ctx = this.$refs.chart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: years,
            datasets: [
              {
                label: 'PM 2.5 Levels',
                data: values,
                borderColor: '#42A5F5',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      resetChart() {
        this.map.flyTo({
          center: [0, 0],
          zoom: 2
        });
  
        const averages = {};
        this.chartData.forEach((row) => {
          for (let year = 1998; year <= 2020; year++) {
            if (!averages[year]) averages[year] = [];
            averages[year].push(parseFloat(row[`X${year}`]) || 0);
          }
        });
  
        for (let year in averages) {
          const sum = averages[year].reduce((a, b) => a + b, 0);
          averages[year] = sum / averages[year].length;
        }
  
        this.updateChartData(null);
      },
    },
  };
  </script>
  
  <style>
  #app {
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
  }
  
  #map {
    height: 100%;
    width: 100%;
  }
  
  .chart-container {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 400px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  
  .chart-container h2 {
    display: inline-block;
    margin: 0;
    font-size: 1.5em;
  }
  
  .chart-container h2 span {
    color: #42A5F5;
  }
  
  .chart-container button {
    float: right;
    background: #42A5F5;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .chart-container button:hover {
    background: #357ABD;
  }
  
  .chart-container p {
    margin: 5px 0;
    color: #555;
  }
  
  .chart-container canvas {
    width: 100% !important;
    height: auto !important;
  }
  </style>
 





