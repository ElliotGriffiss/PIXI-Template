const path = require("path");
const fs   = require("fs");

let bundles = [];

function GenerateFromDirectory(Directory) {
    fs.readdirSync(Directory).forEach(fileName => {
        const Absolute = path.join(Directory, fileName);

        if (fs.statSync(Absolute).isDirectory()) {
            let assets = [];

            fs.readdirSync(Absolute).forEach((fileName) => {
                const fullPath = path.join(Absolute, fileName);

                assets.push( {
                    name: fileName.split("."[0])[0],
                    alias: fileName.split("."[0])[0],
                    src: fullPath.replace("src\\", "")
                });
            });

            bundles.push({
                name: fileName,
                assets: assets
            });
        }
    });
}

GenerateFromDirectory('src/Assets');


fs.writeFile("src/AssetManifest.json", JSON.stringify( {bundles}, null, 4
),function(err) {
    if (err) {
        console.log(err);
    }
});