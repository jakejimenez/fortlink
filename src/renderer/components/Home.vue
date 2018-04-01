<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <div style="width: 45%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a class="btn btn-primary" href="#"><span class="fui-home"></span></a>
      <a v-on:click="goToStats" class="btn btn-primary" href="#"><span class="fui-list-columned"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-search"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-user"></span></a>
    </div>
  </div>
  <br/>

</div>
</template>

<script>
var request = require('request');
var fortniteBrNews = "https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game";

export default {
  name: 'home',
  data() {
    return {
      title: "Fortlink"
    }
  },
  methods: {
    goToStats() {
      this.$router.push('/stats')
    },

    getNews() {
      request(fortniteBrNews, function(error, response, body) {
        console.log(response)
      });
    }
  }
}
</script>
