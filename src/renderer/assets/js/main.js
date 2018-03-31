var request = require('request');

function getStats() {
  var playerName = document.getElementById('inputfield').value;
  document.getElementById('username').innerHTML = playerName;

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

      // General
      /*var level = document.getElementById('level');
      level.innerHTML = `Level: ${stats.br.profile.level}`;
      var killDeath = document.getElementById('kpd');
      killDeath.innerHTML = `K/D: ${stats.br.stats.pc.all.kpd}`;
      var totalwins = document.getElementById('totalwins');
      totalwins.innerHTML = `Wins: ${stats.br.stats.pc.all.wins}`;
      var winrate = document.getElementById('winrate');
      winrate.innerHTML = `Win Rate: ${stats.br.stats.pc.all.winRate}%`;*/

      // Solos
      var killDeath = document.getElementById('kpd-solo');
      killDeath.innerHTML = `K/D: ${stats.br.stats.pc.solo.kpd}`;
      //var killMinute = document.getElementById('kpm-solo');
      //killMinute.innerHTML = `K/D: ${stats.br.stats.pc.solo.kpm}`;
      var totalwins = document.getElementById('totalwins-solo');
      totalwins.innerHTML = `Wins: ${stats.br.stats.pc.solo.wins}`;
      var winrate = document.getElementById('winrate-solo');
      winrate.innerHTML = `Win Rate: ${stats.br.stats.pc.solo.winRate}%`;

      // Duos
      var killDeath = document.getElementById('kpd-duo');
      killDeath.innerHTML = `K/D: ${stats.br.stats.pc.duo.kpd}`;
      //var killMinute = document.getElementById('kpm-duo');
      //killMinute.innerHTML = `K/D: ${stats.br.stats.pc.duo.kpm}`;
      var totalwins = document.getElementById('totalwins-duo');
      totalwins.innerHTML = `Wins: ${stats.br.stats.pc.duo.wins}`;
      var winrate = document.getElementById('winrate-duo');
      winrate.innerHTML = `Win Rate: ${stats.br.stats.pc.duo.winRate}%`;

      // Squads
      var killDeath = document.getElementById('kpd-squad');
      killDeath.innerHTML = `K/D: ${stats.br.stats.pc.squad.kpd}`;
      //var killMinute = document.getElementById('kpm-squad');
      //killMinute.innerHTML = `K/D: ${stats.br.stats.pc.squad.kpm}`;
      var totalwins = document.getElementById('totalwins-squad');
      totalwins.innerHTML = `Wins: ${stats.br.stats.pc.squad.wins}`;
      var winrate = document.getElementById('winrate-squad');
      winrate.innerHTML = `Win Rate: ${stats.br.stats.pc.squad.winRate}%`;
    }
  })
}

function handleEnter(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        getStats();
    }
}

function saveUser() {

}
