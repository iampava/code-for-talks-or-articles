// Automatically resize images.

const fs = require("fs");
const sharp = require("sharp");

const fileNames = fs.readdirSync("src/original-images");

if (!fs.existsSync('src/images')){
    fs.mkdirSync('src/images');
}

Promise.all(fileNames.map(name => {
    const actualName = name.split(".")[0];
    const extension = name.split(".")[1];

    return Promise.all([
        sharp(`src/original-images/${name}`).toFile(`src/images/${actualName}_max.${extension}`),
        sharp(`src/original-images/${name}`).resize(2000).toFile(`src/images/${actualName}_med.${extension}`),
        sharp(`src/original-images/${name}`).resize(800).toFile(`src/images/${actualName}_low.${extension}`),
    ])
})).then(() => {
    console.log('\x1b[32m%s\x1b[0m', `Images succesfully resized!`);
});