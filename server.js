const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

const ProgressiveHTMLRouter = require('./_server/progressive-html.router');
const BlockingScriptsRouter = require('./_server/blocking-scripts.router');
const PreloadScannerRouter = require('./_server/preload-scanner.router');
const FontsRouter = require('./_server/font-loading.router');

app.use('/progressive-html', ProgressiveHTMLRouter);
app.use('/blocking-scripts', BlockingScriptsRouter);
app.use('/preload-scanner', PreloadScannerRouter);
app.use('/font-loading', FontsRouter);


app.use('/', express.static(`${__dirname}/`));

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
});
