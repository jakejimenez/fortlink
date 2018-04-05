
<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <p class="ftfont" style="color:white; text-align: center;">{{ taskStatus }}</p>
  <div style="width: 60%; margin: 0 auto;" class="btn-toolbar">
    <div class="btn-group">
      <a v-on:click="goToHome" class="btn btn-primary" href="#"><span class="fui-home"></span></a>
      <a v-on:click="goToStats" class="btn btn-primary" href="#"><span class="fui-list-columned"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-search"></span></a>
      <a class="btn btn-primary" href="#"><span class="fui-user"></span></a>
      <a v-on:click="goToStatus" class="btn btn-primary" href="#"><span class="fui-windows"></span></a>
    </div>
  </div>
  <br/>
  <div v-if="!authenticated" class="container">
    <div class="login-form">
      <div class="form-group">
        <input v-model="login.email" type="email" class="form-control login-field ftfont" value="" placeholder="Email" id="login-email">
        <label class="login-field-icon fui-user" for="login-name"></label>
      </div>

      <div class="form-group">
        <input v-model="login.password" type="password" class="form-control login-field ftfont" value="" placeholder="Password" id="login-pass">
        <label class="login-field-icon fui-lock" for="login-pass"></label>
      </div>

      <a v-on:click="loginUser" class="btn btn-primary btn-lg btn-block ftfont" href="#">Log in</a>
      <a v-on:click="signup" class="btn btn-success btn-lg btn-block ftfont" href="#">Signup</a>
      <a class="login-link ftfont" href="#">Lost your password?</a>
    </div>
  </div>
  <div v-else class="container">
    <div class="todo">
      <ul>
        <li >
          <div class="todo-icon"></div>
          <div class="todo-content">
            <img style="display: block; margin: 0 auto; border-radius: 25px;" :src=userAuth.imageURL width="100" />
            <h4 style="text-align: center;" class="ftfont">{{ userAuth.email }}</h4>
            <p class="ftfont" style="color: white;">

            </p>
            <br />
            <a v-on:click="signOut" class="btn btn-warning btn-lg btn-block ftfont" href="#">Sign out</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
// Some sort of error is occuring where the program continues showing a white screen when compiled. 4/2/18 10:34 PM
// Requires
var request = require('request');
var Store = require('electron-store');
var firebase = require('firebase');
var isOnline = require('is-online');

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
      userAuth: {
        email: "",
        username: "",
        imageURL: "",
        uid: "",
        friends: [],
        stats: [],
        refreshToken: ""

      },
      taskStatus: "",
      authenticated: false
    }
  },
  methods: {
    goToStats() {
      this.$router.push('/stats')
    },

    goToHome() {
      this.$router.push('/')
    },

    goToStatus() {
      this.$router.push('/status')
    },

    goToMatch() {
      this.$router.push('/match')
    },

    goToStatus() {
      this.$router.push('/status')
    },

    loginUser() {
      console.log("Working...")
      var self = this;
      var userLogin = {
        email: self.login.email,
        password: self.login.password
      }
      // Sign in existing user
      firebase.auth().signInWithEmailAndPassword(userLogin.email, userLogin.password)
        .catch(function(err) {
          if (err) {
            console.log(err)
            self.taskStatus = "An error occured."
          }
        });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user == undefined) {
          self.authenticated = false;
        } else {
          console.log(user);
          self.authenticated = true;

          // Save user information
          if (user.photoURL == "" || user.photoURL == null || user.photoURL == undefined) {
            var userPhoto = "http://via.placeholder.com/100x100";
          }

          localDb.set('user', {
            "displayName": user.displayName,
            "email": user.email,
            "uid": user.uid,
            "refreshToken": user.refreshToken,
            "password": userLogin.password,
            "imageURL": userPhoto
          });

          self.userAuth.email = localDb.get('user.email');
          self.userAuth.uid = localDb.get('user.uid')
          self.userAuth.refreshToken = localDb.get('user.refreshToken');
          self.userAuth.imageURL = localDb.get('user.imageURL');
        }
      });
    },

    signup() {
      var self = this;
      firebase.auth().createUserWithEmailAndPassword(self.login.email, self.login.password).catch(function(error) {
        // Handle Errors here.
        if (error) {
          console.log(error)
          self.taskStatus = "An error occured."
        }

        self.taskStatus = "User created..."
      })
    },

    signOut() {
      var self = this;

      firebase.auth().signOut()
        .catch(function(err) {
          if (err) {
            console.log(err)
          }
        });

        // Delete local user
        localDb.delete('user');

        // Remove authenticated
        self.authenticated = false;
    },

    forgotPass() {

    }
  },
  mounted: function() {
    var self = this;

    if (localDb.get('user')) {

      firebase.auth().signInWithEmailAndPassword(localDb.get('user.email'), localDb.get('user.password'))
        .catch(function(err) {
          if (err) {
            console.log(err)
            self.taskStatus = "An error occured."
          }
        });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user == undefined) {
          self.authenticated = false;
        } else {
          self.authenticated = true;

          self.userAuth.email = user.email;
          self.userAuth.uid = user.uid;
          self.userAuth.refreshToken = user.refreshToken;
          self.userAuth.imageURL = localDb.get('user.imageURL');
        }
      });
    } else {
      self.authenticated = false;
    }
  }
}
</script>
