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
      <a v-on:click="goToStatus" class="btn btn-primary" href="#"><i class="fa fa-server"></i></a>
      <a v-on:click="goToBP" class="btn btn-primary" href="#"><img width="18" src="../assets/images/bp_icon.png" /></a>
      <a class="btn btn-primary active" href="#"><i class="fa fa-twitch"></i></a>
    </div>
  </div>
  <br/>
  <div class="container">
    <a class="embedly-card" data-card-theme="dark" data-card-controls="0" href="https://www.twitch.tv/tsm_myth">TSM_Myth - Twitch</a>
    <br />
    <a class="btn btn-block btn-success ftfont" href="#">Open in Browser</a>
  </div>
</div>
</template>

<script>
// Requires
const isOnline = require('is-online');
var firebase = require('firebase');

export default {
  name: 'twitch',
  data() {
    return {
      title: {
        pt1: "Fort",
        pt2: "link"
      },
      taskStatus: "",
      featuredTwitch: [{
          name: "tsm_myth",
          url: "https://www.twitch.tv/tsm_myth",
          config: {}
        },
        {
          name: "ninja",
          url: "https://www.twitch.tv/ninja",
          config: {}
        }
      ]
    }
  },
  methods: {
    closeWindow() {
      this.w.close();
      window.close()
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
    },

    goToHome() {
      this.$router.push('/')
    },

    getTwitchStreams() {

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
        self.getTwitchStreams();
      }
    })

    setInterval(function() {
      isOnline().then(online => {
        if (online) {
          self.checkForStatus();
        }
      })
    }, 10000)
  }
}
</script>
