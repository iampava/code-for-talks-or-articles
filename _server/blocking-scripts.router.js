const express = require('express');
const path = require('path');
const BlockingScriptsRouter = express.Router();

BlockingScriptsRouter.get('/style.css', (req, res) => {
    setTimeout(() => {
        res.sendFile(`${path.join(__dirname, '..')}/common/style.css`);
    }, 5000);
});

module.exports = BlockingScriptsRouter;
