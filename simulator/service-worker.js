self.importScripts('./jsdom.js');
const {JSDOM} = require('jsdom');

const CHUNK_SIZE = 1000;
const INTERVAL_SIZE = 250;
const enc = new TextEncoder();

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate' && (event.request.url === '/' || event.request.url.indexOf('localhost') !== -1)) {
        event.respondWith(
            fetch(event.request.url)
                .then(resp => resp.text())
                .then(textResp => preloadEverything(textResp))
                .then(textResp => blockFonts(textResp))
                .then(textResp => {
                    console.log(textResp);
                    const stream = new ReadableStream({
                        start(controller) {
                            function push() {
                                let nextPart = textResp.slice(0, CHUNK_SIZE);
                                textResp = textResp.slice(CHUNK_SIZE);
                                controller.enqueue(enc.encode(nextPart));
                            }

                            let intervalId = setInterval(() => {
                                if (textResp.length === 0) {
                                    clearInterval(intervalId);
                                    controller.close();
                                } else {
                                    push();
                                }
                            }, INTERVAL_SIZE);
                        }
                    });
                    return new Response(stream);
                })
        );
    }
});

function preloadEverything(htmlText) {
    const dom = new JSDOM(htmlText);

    const preloadImages = [...dom.window.document.querySelectorAll('img[src]')]
        .map(img => {
            return `<link rel="preload" as="image" href="${img.src}" />`;
        })
        .reverse()
        .join('');

    const preloadedStyles = [...dom.window.document.querySelectorAll('link[rel="stylesheet"]')]
        .map(stylesheet => {
            return `<link rel="preload" as="style" href="${stylesheet.href}" />`;
        })
        .reverse()
        .join('');

    const preloadedScripts = [...dom.window.document.querySelectorAll('script[src]')]
        .map(script => {
            return `<link rel="preload" as="script" href="${script.src}" />`;
        })
        .reverse()
        .join('');

    dom.window.document.head.innerHTML = `
        ${preloadedScripts} 
        ${preloadImages}
        ${preloadedStyles}
        ${dom.window.document.head.innerHTML}
    `;

    return `<html>
        ${dom.window.document.head.innerHTML}
        ${dom.window.document.body.innerHTML}
    </html>`;
}

function blockFonts(htmlText) {
    const dom = new JSDOM(htmlText);

    const styleTag = dom.window.document.createElement('style');
    styleTag.innerHTML = `* {
        font-display: block;
    }`;
    dom.window.document.head.appendChild(styleTag);

    return `<html>
        ${dom.window.document.head.innerHTML}
        ${dom.window.document.body.innerHTML}
    </html>`;
}
