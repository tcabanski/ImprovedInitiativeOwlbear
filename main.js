import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import axios from 'axios'
import { io } from 'socket.io-client'

axios.get('http://localhost:3000').then(response => {
  displayCombatants(response.data);
}).catch(error => console.error(error));

var socket = io('http://localhost:3000');
socket.on('combatants', function (message) {
  displayCombatants(message.combatants);
});

function displayCombatants(combatants) {
  console.log(combatants);
  var html = `
  <div class="row">
    <div class="col-2">
      <h3 class='float-start'>Init</h3>
    </div>
    <div class="col-6">
      <h3 class='float-start'>Name</h3>
    </div>
    <div class="col">
      <h3 class='float-start'>Health</h3>
    </div>
  </div>`;
  combatants.forEach(combatant => {
    if (combatant.isCurrent) {
      html += '<div class="row bg-primary">'
    } else {
      html += '<div class="row">'
    }
    var healthIndicator = 'unknown';
    switch (combatant.hp) {
      case 'Healthy':
        healthIndicator = '<img src="/public/greenheart.svg" height="20" width="20" alt="Healthy" />';
        break;
      case 'Hurt':
        healthIndicator = '<img src="/public/yellowheart.svg" height="20" width="20" alt="Hurt" />';
        break;
      case 'Bloodied':
        healthIndicator = '<img src="/public/redheart.svg" height="20" width="20" alt="Bloodied" />';
        break;
      case 'Defeated':
        healthIndicator = '<img src="/public/skull.svg" height="20" width="20" alt="Dead" />';
        break;
      default:
        healthIndicator = '---';
        break;

    }
    html += `<div class="col-2"><span class='float-start'>${combatant.init}</span></div><div class="col-6">
      <span class='float-start'>${combatant.name}</div></span><div class="col"><span class='float-start'>${healthIndicator}</span></div></div>`
  });
  document.querySelector('#myApp').innerHTML = html;
}