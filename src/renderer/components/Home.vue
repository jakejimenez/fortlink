<template>
<div>
  <h2 style="text-align: center">{{ title }}</h2>
  <h4 style="text-align: center" class="ftfont">{{ isSigned ? "Welcome!" : "Not signed in"}}</h4>
  <p style="text-align: center; color: white;" class="ftfont"><a href="#">Home</a> ------ <a href="#" v-on:click="goToStats">Stats</a> ------ <a href="#">Match Finder</a></p>
</div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      title: "Fortlink",
      isSigned: false
    }
  },
  methods: {
    goToStats() {
      this.$router.push('/stats')
    }
  }
}
</script>
