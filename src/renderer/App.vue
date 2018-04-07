<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
var firebase = require('firebase');
var app = firebase.initializeApp({
  apiKey: "AIzaSyBmiUcwc3WQs-IEse7Zoov9wdhwsbzczJY",
  authDomain: "harryftbot.firebaseapp.com",
  databaseURL: "https://harryftbot.firebaseio.com",
  projectId: "harryftbot",
  storageBucket: "harryftbot.appspot.com",
  messagingSenderId: "457014829417"
});

  export default {
    name: 'fortlink'
  }
</script>

<style>
  @import url("./assets/css/flat-ui.css");
  @import url("./assets/css/vendor/bootstrap/css/bootstrap.min.css");
  @import url("https://fonts.googleapis.com/css?family=Luckiest+Guy");
  @import url("./assets/css/main.css");
  @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
