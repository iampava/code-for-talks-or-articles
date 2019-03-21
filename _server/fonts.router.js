const express = require('express');
const FontsRouter = express.Router();

const parentDirSplits = __dirname.split('\\');
parentDirSplits.pop();

const parentDir = parentDirSplits.join('\\');

FontsRouter.get('/margarine-font/margarine-v7-latin-regular.woff', delay(3000));
FontsRouter.get('/margarine-font/margarine-v7-latin-regular.woff2', delay(3000));

module.exports = FontsRouter;

function delay(milliseconds) {
    return (req, res) => {
        setTimeout(() => {
            res.sendFile(`${parentDir}/fonts/${req.url}`);
        }, milliseconds);
    };
}
