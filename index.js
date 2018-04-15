const Clarifai = require("clarifai");
var dataParser = require("./lib/dataparser");

/**
 * @typedef Prediction
 * @property {boolean} sfw Is the image safe for work?
 * @property {number} confidence The AI's confidence in the result. (between 1 and 0)
 */

/**
 * @callback nsfai~predictCallback
 * @param {Error} error The error that happened while predicting
 * @param {Prediction} result The prediction
 */

class nsfai {
    /**
     * Create an nsfai instance
     * @param {string} apiKey Your Clarifai API key
     */
    constructor(apiKey) {
        this.app = new Clarifai.App({ // Create a Clarifai App instance
            apiKey
        });
    }

    /**
     * Predict an image's NSFWness.
     * @param {string} data Your URL/Data URL/Base64 string
     * @param {nsfai~predictCallback} cb Your callback
     */
    predict(data, options) {
        var app = this.app;
        return new Promise(function(resolve, reject) {
            try {
                if (!options) {
                    options = {};
                }
                var _options = Object.assign({
                    video: false
                }, options);
                var dataObject = dataParser(data);
                app.models.predict(Clarifai.NSFW_MODEL, dataObject, { video: options.video || dataObject.video }).then(
                    function(response) {
                        resolve({
                            sfw: response.outputs[0].data.concepts[0].name === "sfw",
                            confidence: response.outputs[0].data.concepts[0].value // confidence (0-1) about the result
                        });
                    },
                    function (err) {
                        reject(err);
                    }
                );
            } catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = nsfai;
