
const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrape() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://improvedinitiative.app/p/q56at5np');
    await page.waitForSelector('.combatant', { timeout: 5000 });

    const combatants = await page.evaluate(() => {
        hold = []
        const s = document.querySelectorAll('.combatant');

        s.forEach(s1 => {
          currentHp = ''
          hpSelector = s1.querySelector('.current-hp')
          if (hpSelector.innerHTML.startsWith('<span')) {
            currentHp = hpSelector.querySelector('span').innerText
          } else {
            currentHp = hpSelector.innerHTML
          }

          hold.push({
            init: s1.querySelector('.combatant__initiative').innerText,
            name: s1.querySelector('.combatant__name').innerText,
            hp: currentHp,
            isCurrent: s1.className.includes('active')
          })
        })
        return hold
    });
    console.log(combatants)

    html = '';
    combatants.forEach(combatant => {
      html += '<div>'
      if (combatant.isCurrent) {
        html += '!!'
      }
      html += `${combatant.init} ${combatant.name} ${combatant.hp}</div>`
    });

    await browser.close();
    return combatants;
  } catch (error) {
    console.log(error);
  }
}

exports.scrape = scrape;