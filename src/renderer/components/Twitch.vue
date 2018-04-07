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
    <div v-if="!isStreamOpened" class="todo">
      <div class="todo-search">
        <input id="inputfield" v-model="searchTerm" class="todo-search-field ftfont" type="search" value="" placeholder="TSM_Myth">
      </div>
      <ul>
        <li v-for="(item, index) in filteredStreams">
          <div class="todo-icon">
            <img :src=item.profile_pic width="40" />
          </div>
          <div class="todo-content">
            <p class="ftfont" style="color: white; font-size: 20px;">
              {{item.name}}
            </p>
            <a v-on:click="openStream(item.id)" style="text-decoration: none;" class="ftfont" href="#">Watch Now</a>
            <!--<div style="text-align: right;">
              <a v-if="item.isOnline" class="btn btn-success" style="text-align: right;">{{item.isOnline ? "Online" : "Offline"}}</a>
              <a v-else class="btn btn-danger" style="text-align: right;">{{item.isOnline ? "Online" : "Offline"}}</a>
            </div>-->
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <hr />
      <h3 class="ftfont" style="color:white; text-align: center;">{{featuredTwitch[currentStream].name}}</h3>
      <blockquote class="embedly-card">
        <a style="color: white;" class="embedly-card" data-card-controls="0" data-card-theme="dark" v-bind:href="featuredTwitch[currentStream].url">{{featuredTwitch[currentStream].name}}</a></h4>
        <p></p>
      </blockquote>
      <br />
      <a v-on:click="openStreamInBrowser(featuredTwitch[currentStream].url)" class="btn btn-success btn-block">Open in Browser</a>
      <a v-on:click="closeStream" class="btn btn-danger btn-block">Close Stream</a>
    </div>
  </div>
</div>
</template>

<script>
// Requires
const isOnline = require('is-online');
var firebase = require('firebase');
const shell = require('electron').shell;

export default {
  name: 'twitch',
  data() {
    return {
      title: {
        pt1: "Fort",
        pt2: "link"
      },
      taskStatus: "",
      searchTerm: "",
      currentStream: -1,
      isStreamOpened: false,
      featuredTwitch: [{
          name: "TSM_Myth",
          url: "https://www.twitch.tv/tsm_myth",
          profile_pic: "https://static-cdn.jtvnw.net/jtv_user_pictures/5ef033bb7f147dd1-profile_image-70x70.png",
          config: {},
          isOnline: false,
          id: 0
        },
        {
          name: "ninja",
          url: "https://www.twitch.tv/ninja",
          profile_pic: "https://static-cdn.jtvnw.net/jtv_user_pictures/3f5a1d66-c116-42d2-a153-4ff17ee67a03-profile_image-70x70.png",
          config: {},
          isOnline: false,
          id: 1
        },
        {
          name: "shroud",
          url: "https://www.twitch.tv/shroud",
          profile_pic: "https://static-cdn.jtvnw.net/jtv_user_pictures/shroud-profile_image-850e059aee3d6bfa-70x70.jpeg",
          config: {},
          isOnline: false,
          id: 2
        },
        {
          name: "TSM_Hamlinz",
          url: "https://www.twitch.tv/TSM_Hamlinz",
          profile_pic: "https://static-cdn.jtvnw.net/jtv_user_pictures/3f9e12fe-9c73-4e74-8d2b-edfa12a5aa40-profile_image-70x70.png",
          config: {},
          isOnline: false,
          id: 3
        },
        {
          name: "DrLupo",
          url: "https://www.twitch.tv/drlupo",
          profile_pic: "https://static-cdn.jtvnw.net/jtv_user_pictures/d31a80e8-4bdd-44b8-a300-f95ddfc7255e-profile_image-70x70.png",
          config: {},
          isOnline: false,
          id: 4
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

    openStream(id) {
      this.currentStream = id;
      this.isStreamOpened = true;
    },

    openStreamInBrowser(link) {
      shell.openExternal(link)
    },

    closeStream() {
      this.isStreamOpened = false;
      this.currentStream = -1;
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
  },
  computed: {
    filteredStreams: function() {
      var self = this;
      return this.featuredTwitch.filter(function(stream) {
        return stream.name.toLowerCase().indexOf(self.searchTerm.toLowerCase()) >= 0;
      });
    }
  }
}
</script>
