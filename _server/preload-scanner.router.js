const express = require('express');
const PreloadScannerRouter = express.Router();

const parentDirSplits = __dirname.split('\\')
parentDirSplits.pop();

const parentDir = parentDirSplits.join('\\')

PreloadScannerRouter.get('/bob.png', delay(500));
PreloadScannerRouter.get('/alice.png', delay(1000));
PreloadScannerRouter.get('/app.js', delay(1500));
PreloadScannerRouter.get('/vendors.js', delay(1500));

module.exports = PreloadScannerRouter;

function delay(milliseconds) {
    return (req, res) => {
        setTimeout(() => {
            res.sendFile(`${parentDir}/preload-scanner/${req.url}`)
        }, milliseconds)
    }
}

