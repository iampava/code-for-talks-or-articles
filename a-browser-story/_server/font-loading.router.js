const path = require('path');
const express = require('express');
const FontsRouter = express.Router();

FontsRouter.get('/margarine-font/margarine.woff', delay(2500));
FontsRouter.get('/margarine-font/margarine.woff2', delay(2500));

FontsRouter.get('/margarine-font-slow/margarine-slow.woff', delay(10000));
FontsRouter.get('/margarine-font-slow/margarine-slow.woff2', delay(10000));

module.exports = FontsRouter;

function delay(milliseconds) {
    return (req, res) => {
        setTimeout(() => {
            res.sendFile(`${path.join(__dirname, '..')}/font-loading/${req.url}`, {
                headers: {
                    'Cache-control': 'no-cache, no-store, must-revalidate'
                }
            });
        }, milliseconds);
    };
}
