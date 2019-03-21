const {JSDOM} = require('jsdom');

import Canvas from './Canvas.js';

const browser = new Canvas(document.querySelector('canvas'));

const renderBtn = document.getElementById('renderBtn');
renderBtn.addEventListener('click', () => {
    const html = document.getElementById('htmlTextarea').value;

    browser.clear();

    const dom = new JSDOM(html);
    const elements = dom.window.document.querySelectorAll('body *');


    elements.forEach(el => {
        switch (el.tagName) {
            case 'IMG':
            browser.drawImage(el.src, {width: el.width, height: el.height, display: el.dataset.display});
                break;
            case 'P':
                browser.drawText(el.textContent, {width: el.width, display: el.dataset.display})
                break;
            default:
                break;
        }
    });
});

const src = 'https://iampava.com/PICTURES/pava_portrait.jpg';


// browser.drawText('bobo');
// browser.drawText('Z', {display: "inline-block", width: 100} ); 
// browser.drawText('Z', {display: "inline-block", width: 100} ); 
// browser.drawText('FrontEnd'); 
// browser.drawText('Z', {display: "inline-block", width: 100} ); 
// browser.drawText('Z', {display: "inline-block", width: 100} ); 
// browser.drawText('Bobo', {display: "inline-block", width: 100} );
// browser.drawImage(src, {width: 150, height: 150, display: 'inline-block'});
// browser.drawImage(src, {width: 150, height: 150, display: 'block'});
// browser.drawImage(src, {width: 150, height: 150, display: 'inline-block'});
// browser.drawImage(src, {width: 150, height: 150, display: 'inline-block'});
// browser.drawImage(src, {width: 150, height: 150, display: 'inline-block'});
// browser.drawImage(src, {width: 150, height: 150, display: 'inline-block'});
