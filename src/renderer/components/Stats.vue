<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <div style="width: 70%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a v-on:click="goHome" class="btn btn-primary" href="#fakelink"><span class="fui-home"></span></a>
      <a class="btn btn-primary active" href="#fakelink"><i class="fa fa-list-ol"></i></a>
      <a class="btn btn-primary" href="#fakelink"><span class="fui-search"></span></a>
      <a v-on:click="goToProfile" class="btn btn-primary disabled" href="#fakelink"><span class="fui-user"></span></a>
      <a v-on:click="goToStatus" class="btn btn-primary" href="#"><i class="fa fa-server"></i></a>
      <a v-on:click="goToBP" class="btn btn-primary" href="#"><img width="18" src="../assets/images/bp_icon.png" /></a>
    </div>
  </div>
  <br />
  <div class="container">
    <div class="todo">
      <div class="todo-search">
        <input id="inputfield" class="todo-search-field ftfont" v-on:keyup="handleEnter" type="search" value="" placeholder="skrypt-cs">
      </div>
      <ul>
        <li>
          <div class="todo-icon"></div>
          <div v-if="isObtained" class="todo-content">
            <hr />
            <h4>General</h4>
            <span id="kpd-general">K/D: {{stats.general.kpd}}</span>
            <br/>
            <span id="totalwins-general">Wins: {{stats.general.totalWins}}</span>
            <br/>
            <span id="winrate-general">Win Rate: {{stats.general.winRate}}%</span>
            <hr/>
            <h4>Solo</h4>
            <span id="kpd-solo">K/D: {{stats.solo.kpd}}</span>
            <br/>
            <span id="totalwins-solo">Wins: {{stats.solo.totalWins}}</span>
            <br/>
            <span id="winrate-solo">Win Rate: {{stats.solo.winRate}}%</span>
            <hr/>
            <h4>Duo</h4>
            <span id="kpd-duo">K/D: {{stats.duo.kpd}}</span>
            <br/>
            <span id="totalwins-duo">Wins: {{stats.duo.totalWins}}</span>
            <br/>
            <span id="winrate-duo">Win Rate: {{stats.duo.winRate}}%</span>
            <hr/>
            <h4>Squad</h4>
            <span id="kpd-squad">K/D: {{stats.squad.kpd}}</span>
            <br/>
            <span id="totalwins-squad">Wins: {{stats.squad.totalWins}}</span>
            <br/>
            <span id="winrate-squad">Win Rate: {{stats.squad.winRate}}%</span>
            <hr/>
          </div>
          <div v-else class="todo-content">
            <p class="ftfont">No stats to display</p>
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
      title: "Fortlink",
      isObtained: false,
      stats: {
        general: {
          kpd: "",
          totalWins: "",
          winRate: ""
        },
        solo: {
          kpd: "",
          totalWins: "",
          winRate: ""
        },
        duo: {
          kpd: "",
          totalWins: "",
          winRate: ""
        },
        squad: {
          kpd: "",
          totalWins: "",
          winRate: ""
        }
      }
    }
  },
  methods: {
    getStats() {
      var self = this;
      var playerName = document.getElementById('inputfield').value;
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
          self.isObtained = true;

          // General
          self.stats.general.kpd = stats.br.stats.pc.all.kpd;
          self.stats.general.totalWins = stats.br.stats.pc.all.wins;
          self.stats.general.winRate = stats.br.stats.pc.all.winRate;

          // Solos
          self.stats.solo.kpd = stats.br.stats.pc.solo.kpd;
          self.stats.solo.totalWins = stats.br.stats.pc.solo.wins;
          self.stats.solo.winRate = stats.br.stats.pc.solo.winRate;

          // Duos
          self.stats.duo.kpd = stats.br.stats.pc.duo.kpd;
          self.stats.duo.totalWins = stats.br.stats.pc.duo.wins;
          self.stats.duo.winRate = stats.br.stats.pc.duo.winRate;

          // Squads
          self.stats.squad.kpd = stats.br.stats.pc.squad.kpd;
          self.stats.squad.totalWins = stats.br.stats.pc.squad.wins;
          self.stats.squad.winRate = stats.br.stats.pc.squad.winRate;

        } else {
          self.isObtained = false;
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
    goToBP() {
      this.$router.push('/battlepass')
    },
    goToStats() {
      this.$router.push('/stats')
    },
    goToStatus() {
      this.$router.push('/status')
    },
    goToProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>
