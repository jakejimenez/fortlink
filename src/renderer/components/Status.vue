<template>
<div>
  <h2 style="text-align: center; color: white;">{{ title.pt1 }}<span style="color: #EDC92D;">{{title.pt2}}</span></h2>
  <p class="ftfont" style="color:white; text-align: center;">{{ taskStatus }}</p>
  <div style="width: 80%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a v-on:click="goToHome" class="btn btn-primary" href="#"><span class="fui-home"></span></a>
      <a v-on:click="goToStats" class="btn btn-primary" href="#fakelink"><i class="fa fa-list-ol"></i></a>
      <a class="btn btn-primary" href="#"><span class="fui-search"></span></a>
      <a v-on:click="goToProfile" class="btn btn-primary disabled" href="#"><span class="fui-user"></span></a>
      <a class="btn btn-primary active" href="#"><i class="fa fa-server"></i></a>
      <a v-on:click="goToBP" class="btn btn-primary" href="#"><img width="18" src="../assets/images/bp_icon.png" /></a>
      <a v-on:click="goToTwitch" class="btn btn-primary" href="#"><i class="fa fa-twitch"></i></a>
    </div>
  </div>
  <br/>
  <div class="container">
    <div class="todo">
      <ul>
        <li v-for="(item, index) in parsedList">
          <div class="todo-icon">
            <img v-if="statusList[index] == 'Green'" src="https://cdn-images-1.medium.com/max/512/1*nZ9VwHTLxAfNCuCjYAkajg.png" width="50" />
            <img v-if="statusList[index] == 'Blue'" src="http://www.knowledgeall.net/wp-content/uploads/2013/03/blue-dot.png" width="50" />
            <img v-if="statusList[index] == 'Yellow'" src="http://www.clker.com/cliparts/m/a/r/p/w/I/yellow-dot-md.png" width="50" />
            <img v-if="statusList[index] == 'Red'" src="http://www.ddivani.com/images/dot.png" width="50" />
          </div>
          <div class="todo-content">
            <h4 class="ftfont" style="color: white;">
              {{item.name}}
            </h4>
            <p v-if="statusList[index] == 'Green'" class="ftfont" style="font-size: 15px; color: green;">Operational</p>
            <p v-else-if="statusList[index] == 'Blue'" class="ftfont" style="font-size: 15px; color: #00FFFF;">Under Maintenance</p>
            <p v-else-if="statusList[index] == 'Yellow'" class="ftfont" style="font-size: 15px; color: yellow;">Degraded Performance</p>
            <p v-else-if="statusList[index] == 'Red'" class="ftfont" style="font-size: 15px; color: red;">Disabled</p>
            <p v-else class="ftfont" style="font-size: 15px; color: red;">Status Unavailable</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
// Requires
var request = require('request');
const Store = require('electron-store');
const isOnline = require('is-online');
let cheerio = require('cheerio')

// Important Variables
const localDb = new Store();

export default {
  name: 'status',
  data() {
    return {
      title: {pt1: "Fort", pt2: "link"},
      taskStatus: "",
      statusList: [],
      parsedList: [{
        name: "Website and Forums"
      }, {
        name: "Game Services"
      }, {
        "name": "Login"
      }, {
        "name": "Parties, Friends, and Messaging"
      }, {
        "name": "Voice Chat"
      }, {
        "name": "Matchmaking"
      }, {
        "name": "Stats and Leaderboards"
      }]
    }
  },
  methods: {
    goToStats() {
      this.$router.push('/stats')
    },

    goToBP() {
      this.$router.push('/battlepass')
    },

    goToProfile() {
      this.$router.push('/profile')
    },

    goToHome() {
      this.$router.push('/')
    },

    goToTwitch() {
      this.$router.push('/twitch')
    },

    getStatus() {
      var statusArray = [];
      var self = this;
      request('https://status.epicgames.com/', function(error, response, html) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);
          $('.child-components-container .component-inner-container').each(function(i, elem) {
            if ($(this).hasClass("status-green")) {
              statusArray.push("Green");
            } else if ($(this).hasClass("status-blue")) {
              statusArray.push("Blue");
            } else if ($(this).hasClass("status-red")) {
              statusArray.push("Red");
            } else if ($(this).hasClass("status-yellow")) {
              statusArray.push("Yellow");
            } else {
              statusArray.push("NA")
            }
          })
        }
      });

      self.statusList = statusArray;
    }
  },
  mounted: function() {
    this.getStatus();
  }
}
</script>
