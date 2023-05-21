import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import axios from 'axios'
import { io } from 'socket.io-client'
import OBR from '@owlbear-rodeo/sdk'

//test
//var url = 'http://localhost:3000';

//production
var url = 'http://18.188.89.43:8080/';

var theme;
if (OBR.isAvailable) {
  OBR.onReady(async () => {
    theme = await OBR.theme.getTheme();
  });
}

load();
var socket = io(url);
socket.on('combatants', function (message) {
  displayCombatants(message.combatants);
});

function load() {
  axios.get(url).then(response => {
    displayCombatants(response.data);
  }).catch(error => console.error(error));
}

function displayCombatants(combatants) {
  var style = '';
  var highlightStyle = '';
  if (OBR.isAvailable) {
    style = ` style="background-color:${theme.background.default};color:${theme.text.primary}"`;
    highlightStyle =` style="background-color:${theme.secondary.dark};color:${theme.secondary.contrastText}"`;
  }

  var html = `
  <div class="container"${style}">
    <div class="row">
      <div class="col-2">
        <h6 class='float-start'>Init</h6>
      </div>
      <div class="col-8">
        <h6 class='float-start'>Name</h6>
      </div>
      <div class="col-1">
        <h6 class='float-start'></h6>
      </div>
    </div>`;
  combatants.forEach(combatant => {
    if (combatant.isCurrent) {
      if (highlightStyle.length > 0) {
        html += `<div class="row" ${highlightStyle}>`
      } else {
        html += '<div class="row bg-primary">'
      }
    } else {
      html += '<div class="row">'
    }

    var healthIndicator = 'unknown';
    var greenHeartUrl = new URL('greenheart.svg', import.meta.url).href
    switch (combatant.hp) {
      case 'Healthy':
        healthIndicator = '<img src="/greenHeart.svg" height="20" width="20" alt="Healthy" />';
        break;
      case 'Hurt':
        healthIndicator = '<img src="/yellowHeart.svg" height="20" width="20" alt="Hurt" />';
        break;
      case 'Bloodied':
        healthIndicator = '<img src="/redHeart.svg" height="20" width="20" alt="Bloodied" />';
        break;
      case 'Defeated':
        healthIndicator = '<img src="/skull.svg" height="20" width="20" alt="Dead" />';
        break;
      default:
        healthIndicator = '---';
        break;

    }
    html += `<div class="col-2"><span class='float-start'>${combatant.init}</span></div><div class="col-8">
      <span class='float-start'>${combatant.name}</div></span><div class="col-1"><span class='float-start'>${healthIndicator}</span></div></div>`
  });
  document.querySelector('#myApp').innerHTML = html + '</div>';
}