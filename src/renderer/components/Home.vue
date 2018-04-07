<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <p class="ftfont" style="color:white; text-align: center;">{{ taskStatus }}</p>
  <div style="width: 60%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a class="btn btn-primary active" href="#"><span class="fui-home"></span></a>
      <a v-on:click="goToStats" class="btn btn-primary" href="#"><span class="fui-list-columned"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-search"></span></a>
      <a v-on:click="goToProfile" class="btn btn-primary" href="#"><span class="fui-user"></span></a>
      <a v-on:click="goToStatus" class="btn btn-primary" href="#"><span class="fui-windows"></span></a>
    </div>
  </div>
  <br/>
  <div class="container">
    <div class="todo">
      <ul>
        <li v-for="item in newsParsed">
          <div class="todo-icon"><img :src=item.image width="100" /></div>
          <div class="todo-content">
            <p class="ftfont" style="color: white;">
              {{ item.title }}
            </p>{{ item.body }}
          </div>
        </li>
      </ul>
    </div>
    <div style="width: 35%; margin: 0 auto;">
      <a v-on:click="closeWindow" class="btn btn-danger ftfont" href="#">Exit Fortlink</a>
    </div>
  </div>
</div>
</template>

<script>

// Requires
var request = require('request');
const Store = require('electron-store');
var firebase = require('firebase');
const isOnline = require('is-online');
const remote = require('electron').remote

// Important Variables
const localDb = new Store();
var fortniteBrNews = "https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/battleroyalenews";

export default {
  name: 'home',
  data() {
    return {
      title: "Fortlink",
      newsParsed: [],
      taskStatus: "",
      w: remote.getCurrentWindow()
    }
  },
  methods: {
    closeWindow() {
      this.w.close();
    },

    goToStats() {
      this.$router.push('/stats')
    },

    goToStatus() {
      this.$router.push('/status')
    },

    goToProfile() {
      this.$router.push('/profile')
    },

    getNews() {
      var self = this;

      // Get news via API
      request(fortniteBrNews, function(error, response, body) {
        var obj = JSON.parse(body);
        self.taskStatus = "News downloaded...";
        self.newsParsed = obj.news.messages;
        self.taskStatus = "";

      });
    },

    checkForStatus() {
      var self = this;
      var ref = firebase.database().ref('globalStatus');
      ref.on("value", function(snapshot) {
        if (snapshot.val() == "None") {
          self.taskStatus = "";
        } else {
          self.taskStatus = snapshot.val();
          console.log(snapshot.val())
        }
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },

    checkForPushNotif() {
      var self = this;
      var ref = firebase.database().ref('globalPush');
      ref.on("value", function(snapshot) {
        if (snapshot.val() != "None") {
          console.log(snapshot.val());
        }
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
  },
  mounted: function() {
    var self = this;
    this.getNews();

    setInterval(function() {
      isOnline().then(online => {
        if (online) {
          self.checkForStatus();
          self.checkForPushNotif();
        }
      })
    }, 10000)
  }
}
</script>
