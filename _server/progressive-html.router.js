const express = require('express');
const ProgressiveHTMLRouter = express.Router();

const part1 = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            console.log("AHA!")
        })
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>Part 1</h1>`;

const part2 = `<h2>Part 2</h2>`;
const part3 = `<h3>Part 3</h3>
</body>
</html>`



ProgressiveHTMLRouter.get('/', (req, res) => {
   res.writeHead(200, {
           'content-type': 'text/html'
       })

   res.write(part1);
   res.end();

//    setTimeout(() => {
//        res.write(part2)
//    }, 2000)

//    setTimeout(() => {
//     res.write(part3)
//     res.end();
// }, 5000)
});

module.exports = ProgressiveHTMLRouter;