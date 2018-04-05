<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <p class="ftfont" style="color:white; text-align: center;">{{ taskStatus }}</p>
  <div style="width: 60%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a v-on:click="goToHome" class="btn btn-primary" href="#"><span class="fui-home"></span></a>
      <a v-on:click="goToStats" class="btn btn-primary" href="#"><span class="fui-list-columned"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-search"></span></a>
      <a v-on:click="goToProfile" class="btn btn-primary" href="#"><span class="fui-user"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-windows"></span></a>
    </div>
  </div>
  <br/>
  <div class="container">
    <div class="todo">
      <ul>
        <li v-for="item in statusList">
          <div class="todo-icon"></div>
          <div class="todo-content">
            <h4 class="ftfont" style="color: white;">
              {{item.name}}
            </h4>{{item.status}}
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
      title: "Fortlink",
      taskStatus: "",
      statusList: [{
        name: "Website and Forums",
        "status": ""
      }, {
        name: "Game Services",
        "status": ""
      }, {
        "name": "Login",
        "status": ""
      }, {
        "name": "Parties, Friends, and Messaging",
        "status": ""
      }, {
        "name": "Voice Chat",
        "status": ""
      }, {
        "name": "Matchmaking",
        "status": ""
      }, {
        "name": "Stats and Leaderboards",
        "status": ""
      }]
    }
  },
  methods: {
    goToStats() {
      this.$router.push('/stats')
    },

    goToProfile() {
      this.$router.push('/profile')
    },

    goToHome() {
      this.$router.push('/')
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

      for (var i = 0; i < statusArray.length; i++) {
        if (statusArray[i] == "Green") {
          self.statusList[i].status = "Operational";
        } else if (statusArray[i] == "Blue") {
          self.statusList[i].status = "Under Maintenance";
        } else if (statusArray[i] == "Red") {
          self.statusList[i].status = "Disabled";
        } else if (statusArray[i] == "Degraded Performance") {
          self.statusList[i].status = "Disabled";
        } else {
          self.statusList[i].status = "Status unavailable";
        }
      }

      self.statusList = statusArray;
    }
  },
  mounted: function() {
    this.getStatus();
    console.log(this.statusList);
  }
}
</script>
