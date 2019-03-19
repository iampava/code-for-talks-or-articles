const express = require('express');
const ProgressiveHTMLRouter = express.Router();

const part1 = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Progressive HTML</title>
    </head>
    <body>
        <h1> Part 1... </h1>
`;
const part2 = `<h2> Part 2... </h2>`;
const part3 = `<h3> Part 3 ... </h3> </body> </html>`;


ProgressiveHTMLRouter.get('/', (req, res) => {
    res.set('Content-type', 'text/html');

    setTimeout(() => res.write(part1), 500);
    setTimeout(() => res.write(part2), 2500);
    setTimeout(() =>  {
        res.write(part3);
        res.end();
    }, 5000);
});

module.exports = ProgressiveHTMLRouter;