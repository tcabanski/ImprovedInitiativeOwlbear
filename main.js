import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import axios from 'axios'
import { io } from 'socket.io-client'

axios.get('http://localhost:3000').then(response => {
  console.log(response.data);
  var html = '';
  response.data.forEach(combatant => {
    html += '<div>'
    if (combatant.isCurrent) {
      html += '!!'
    }
  html += `${combatant.init} ${combatant.name} ${combatant.hp}</div>`
    });
  document.querySelector('#app').innerHTML = html;
}).catch(error => console.error(error));

var socket = io('http://localhost:3000');
socket.on('combatants', function (message) {
  console.log(message.combatants);
  var html = '';
  message.combatants.forEach(combatant => {
    html += '<div>'
    if (combatant.isCurrent) {
      html += '!!'
    }
  html += `${combatant.init} ${combatant.name} ${combatant.hp}</div>`
    });
  document.querySelector('#app').innerHTML = html;
});

/*
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
*/
