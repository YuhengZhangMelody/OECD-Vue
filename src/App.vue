<template>
    <div id="app">
      <MapComponent />
    </div>
  </template>
  
  <script>
  import MapComponent from './components/Map.vue';
  
  export default {
    name: 'App',
    components: {
      MapComponent
    }
  };
  </script>
  
  <style>
  /* Add your global styles here */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  </style>
  