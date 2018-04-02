<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <p class="ftfont" style="color:white; text-align: center;">{{ taskStatus }}</p>
  <div style="width: 45%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a v-on:click="goToHome" class="btn btn-primary" href="#"><span class="fui-home"></span></a>
      <a v-on:click="goToStats" class="btn btn-primary" href="#"><span class="fui-list-columned"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-search"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-user"></span></a>
    </div>
  </div>
  <br/>
  <div class="container">
    <div class="login-form">
      <div class="form-group">
        <input v-model="login.email" type="email" class="form-control login-field" value="" placeholder="Email" id="login-email">
        <label class="login-field-icon fui-user" for="login-name"></label>
      </div>

      <div class="form-group">
        <input v-model="login.username" type="text" class="form-control login-field" value="" placeholder="Username" id="login-username">
        <label class="login-field-icon fui-play" for="login-username"></label>
      </div>

      <div class="form-group">
        <input v-model="login.password" type="password" class="form-control login-field" value="" placeholder="Password" id="login-pass">
        <label class="login-field-icon fui-lock" for="login-pass"></label>
      </div>

      <a v-on:click="loginUser" class="btn btn-primary btn-lg btn-block" href="#">Log in</a>
      <a v-on:click="signup" class="btn btn-success btn-lg btn-block" href="#">Signup</a>
      <a class="login-link" href="#">Lost your password?</a>
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

// Important Variables
const localDb = new Store();

export default {
  name: 'profile',
  data() {
    return {
      title: "Fortlink",
      login: {
        username: "",
        password: "",
        email: ""
      },
      taskStatus: ""
    }
  },
  methods: {
    goToStats() {
      this.$router.push('/stats')
    },

    goToHome() {
      this.$router.push('/')
    },

    goToMatch() {
      this.$router.push('/match')
    },

    loginUser() {
      var self = this;
      firebase.auth().signInWithEmailAndPassword(self.login.email, self.login.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode) {
          taskStatus = "An error occurred...";
        }
      });
    },

    signup() {
      var self = this;
      firebase.auth().createUserWithEmailAndPassword(self.login.email, self.login.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode) {
          taskStatus = "An error occurred...";
        }
      });
    },

    forgotPass() {

    }
  },
  mounted: function() {

  }
}
</script>
