<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <p class="ftfont" style="color:white; text-align: center;">{{ taskStatus }}</p>
  <div style="width: 70%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a v-on:click="goToHome" class="btn btn-primary" href="#"><span class="fui-home"></span></a>
      <a v-on:click="goToStats" class="btn btn-primary" href="#fakelink"><i class="fa fa-list-ol"></i></a>
      <a class="btn btn-primary" href="#"><span class="fui-search"></span></a>
      <a v-on:click="goToProfile" class="btn btn-primary disabled" href="#"><span class="fui-user"></span></a>
      <a v-on:click="goToStatus" class="btn btn-primary" href="#"><i class="fa fa-server"></i></a>
      <a class="btn btn-primary active" href="#"><img width="18" src="../assets/images/bp_icon.png" /></a>
    </div>
  </div>
  <br/>
  <div v-if="isBattlePass" class="container">
    <hr />
    <h3 class="ftfont" style="text-align: center; color: white">{{challengeTitle}}</h3>
    <div class="todo">
      <ul>
        <li v-for="(item, index) in challengeList">
          <div class="todo-icon">
            <img src="../assets/images/bpicon.png" width="40" />
            {{item.stars}}
          </div>
          <div class="todo-content">
            <p style="color: white; font-size: 15px;">
              {{item.name}}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <hr />
      <h3 class="ftfont" style="text-align: center; color: white">Cheatsheet</h3>
    <img v-if="imageObtained" style="border-radius: 10px; margin: 0 auto; display: block;" :src=battlePassURL width="340" />
    <p v-else style="text-align: center; color: white;" class="ftfont">Loading...</p>
    <br />
    <a v-on:click="downloadImage" class="btn btn-success btn-lg btn-block ftfont" href="#">Download Image</a>
    <br />
    <br />
    <hr />
  </div>
  <div v-else class="container">
    <h1 class="ftfont" style="text-align: center; color: white">Error</h1>
  </div>
</div>
</template>

<script>
// Requires
var firebase = require('firebase');
const isOnline = require('is-online');
var request = require('request');
var fs = require('fs');
let cheerio = require('cheerio');

export default {
  name: 'home',
  data() {
    return {
      title: "Fortlink",
      taskStatus: "",
      battlePassURL: "",
      imageObtained: false,
      challengeListURL: "https://db.fortnitetracker.com/challenges/week-",
      challengeTitle: "",
      challengeList: [{
        name: "",
        "stars": ""
      }, {
        name: "",
        "stars": ""
      }, {
        name: "",
        "stars": ""
      }, {
        name: "",
        "stars": ""
      }, {
        name: "",
        "stars": ""
      }, {
        name: "",
        "stars": ""
      }, {
        name: "",
        "stars": ""
      }],
      challengeWeekNum: "",
      isBattlePass: false
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

    goToHome() {
      this.$router.push('/')
    },

    download(uri, filename) {
      request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', function() {
          console.log("Downloaded")
        });
      });
    },

    downloadImage() {
      if (process.platform === 'win32') {
        this.download(this.battlePassURL, require('path').join(require('os').homedir(), 'Desktop') + "\\battlePass.jpg")
      } else if (process.platform === 'darwin') {
        this.download(this.battlePassURL, require('path').join(require('os').homedir(), 'Desktop') + "/battlePass.jpg")
      } else {
        this.download(this.battlePassURL, "battlePass.jpg")
      }
    },

    checkForBP() {
      var self = this;
      var ref = firebase.database().ref('battlePassImage');
      self.taskStatus = "Loading...";
      ref.on("value", function(snapshot) {
        if (snapshot.val() == "None") {
          self.taskStatus = "Unavailable";
          self.imageObtained = false;
        } else {
          self.battlePassURL = snapshot.val();
          self.imageObtained = true;
        }
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      self.taskStatus = "";
    },

    getPlainChallenges() {
      var challArray = [];
      var self = this;

      var ref = firebase.database().ref('bpChallWeek');
      ref.on("value", function(snapshot) {
        if (snapshot.val() == "None") {
          self.isBattlePass = false;
        } else {
          self.isBattlePass = true;
          self.challengeWeekNum = snapshot.val();
        }
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      if (self.isBattlePass) {
        request(self.challengeListURL + self.challengeWeekNum, function(error, response, html) {
          if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            self.challengeTitle = $('.panel-heading .panel-title').text();
            $('.panel-body .db-well .row .col-xs-6').each(function(i, elem) {
              self.challengeList[i].name = $(this).text();
            })
            $('.panel-body .db-well .row .col-xs-3 span').each(function(i, elem) {
              self.challengeList[i].stars = $(this).text();
            })
          }
        });
      }
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
    }
  },
  mounted: function() {
    var self = this;

    isOnline().then(online => {
      if (online) {
        self.getPlainChallenges();
        self.checkForBP();
      }
    })
  }
}
</script>
