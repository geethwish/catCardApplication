let request = require('request');
let argv = require('minimist')(process.argv.slice(2));
let combineImage = require('combine-image');


function fetchAndCombineImages(text1, text2) {

    let {
        greeting = text1 ? text1 : 'Hello',
        who = text2 ? text2 : 'You',
        width = 1000,
        height = 1000,
        color = 'Pink',
        size = 100,
    } = argv;

    let firstReq = {
        url: 'https://cataas.com/cat/says/' + greeting + '?width=' + width + '&height=' + height + '&color' + color + '&s=' + size,
        encoding: 'binary'
    };

    let secondReq = {
        url: 'https://cataas.com/cat/says/' + who + '?width=' + width + '&height=' + height + '&color' + color + '&s=' + size,
        encoding: 'binary'
    };

    request.get(firstReq, (err, res, firstBody) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Received response with status:' + res.statusCode);

        request.get(secondReq, (err, res, secondBody) => {

            if (err) {
                console.log(err);
                return;
            }

            console.log('Received response with status:' + res.statusCode);

            //convert images to buffer images
            const image1 = new Buffer(firstBody, 'binary');

            const image2 = new Buffer(secondBody, 'binary');

            const date = new Date();

            const day = date.getDate();

            const month = date.getMonth() + 1;

            const year = date.getFullYear();

            const hours = date.getHours();

            const minutes = date.getMinutes();

            const seconds = date.getSeconds()

            const OutputFileName = `outputImage-${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;

            const outputPath = `./images/${OutputFileName}.png`

            console.log(outputPath);

            // combine images
            combineImage([image1, image2]).then((img) => {

                // Save image as file
                img.write(outputPath, () => console.log('done'));

            });

        });

    });

}

fetchAndCombineImages("Good", "world");