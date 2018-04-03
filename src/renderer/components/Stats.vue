<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <div style="width: 45%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a v-on:click="goHome" class="btn btn-primary" href="#fakelink"><span class="fui-home"></span></a>
      <a class="btn btn-primary" href="#fakelink"><span class="fui-list-columned"></span></a>
      <a class="btn btn-primary" href="#fakelink"><span class="fui-search"></span></a>
      <a v-on:click="goToProfile"  class="btn btn-primary" href="#fakelink"><span class="fui-user"></span></a>
    </div>
  </div>
  <br />
  <div class="container">
    <div class="todo">
      <div class="todo-search">
        <input id="inputfield" class="todo-search-field ftfont" v-on:keyup="handleEnter" type="search" value="" placeholder="ninja">
      </div>
      <ul>
        <li>
          <div class="todo-icon"></div>
          <div class="todo-content">
            <h3>
              <strong>Stats: <i id="username"></i></strong>
            </h3>
            <hr/>
            <h4>Solo</h4>
            <span id="kpd-solo"></span>
            <br/>
            <span id="totalwins-solo"></span>
            <br/>
            <span id="winrate-solo"></span>
            <hr/>
            <h4>Duo</h4>
            <span id="kpd-duo"></span>
            <br/>
            <span id="totalwins-duo"></span>
            <br/>
            <span id="winrate-duo"></span>
            <hr/>
            <h4>Squad</h4>
            <span id="kpd-squad"></span>
            <br/>
            <span id="totalwins-squad"></span>
            <br/>
            <span id="winrate-squad"></span>
            <hr/>
            <a href="#" class="ftfont btn btn-block btn-embossed btn-lg btn-success">Save User</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
var request = require('request')

export default {
  name: 'home',
  data () {
    return {
      title: "Fortlink"
    }
  },
  methods: {
    getStats() {
      var playerName = document.getElementById('inputfield').value;
      document.getElementById('username').innerHTML = playerName;

      var options = {
        method: "GET",
        url: `https://fortnite.y3n.co/v2/player/${playerName}`,
        headers: {
          'User-Agent': 'nodejs request',
          'X-Key': "pTVPOvUPxbecRVHfKpMT"
        }
      }

      request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var stats = JSON.parse(body);

          // Solos
          var killDeath = document.getElementById('kpd-solo');
          killDeath.innerHTML = `K/D: ${stats.br.stats.pc.solo.kpd}`;
          var totalwins = document.getElementById('totalwins-solo');
          totalwins.innerHTML = `Wins: ${stats.br.stats.pc.solo.wins}`;
          var winrate = document.getElementById('winrate-solo');
          winrate.innerHTML = `Win Rate: ${stats.br.stats.pc.solo.winRate}%`;

          // Duos
          var killDeath = document.getElementById('kpd-duo');
          killDeath.innerHTML = `K/D: ${stats.br.stats.pc.duo.kpd}`;
          var totalwins = document.getElementById('totalwins-duo');
          totalwins.innerHTML = `Wins: ${stats.br.stats.pc.duo.wins}`;
          var winrate = document.getElementById('winrate-duo');
          winrate.innerHTML = `Win Rate: ${stats.br.stats.pc.duo.winRate}%`;

          // Squads
          var killDeath = document.getElementById('kpd-squad');
          killDeath.innerHTML = `K/D: ${stats.br.stats.pc.squad.kpd}`;
          var totalwins = document.getElementById('totalwins-squad');
          totalwins.innerHTML = `Wins: ${stats.br.stats.pc.squad.wins}`;
          var winrate = document.getElementById('winrate-squad');
          winrate.innerHTML = `Win Rate: ${stats.br.stats.pc.squad.winRate}%`;
        }
      })
    },

    handleEnter: function(e) {
      var keycode = (e.keyCode ? e.keyCode : e.which);
      if (keycode == '13') {
        this.getStats();
      }
    },

    goHome() {
      this.$router.push('/')
    },

    goToProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>
