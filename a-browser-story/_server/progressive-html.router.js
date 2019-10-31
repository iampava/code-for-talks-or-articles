const express = require('express');
const ProgressiveHTMLRouter = express.Router();

const part1 = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Progressive HTML</title>
        <link rel="stylesheet" href="/common/style.css" />
    </head>
    <body>
        <header>
            <h1>Progressive HTML</h1>
        </header>
        <main>
            <h1> Part 1... no delay</h1>`;

const part2 = ` <h2> Part 2... 2.5s delay</h2>`;
const part3 = `<h3> Part 3... 5s delay</h3>
        </main>
        <footer>
            In case the HTML doesnt come in chunks, hard-refresh the page.
        </footer>
    </body>
</html>`;

ProgressiveHTMLRouter.get('/', (req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    });

    res.write(part1);

    setTimeout(() => res.write(part2), 2000);

    setTimeout(() => {
        res.write(part3);
        res.end();
    }, 5000);
});

module.exports = ProgressiveHTMLRouter;
