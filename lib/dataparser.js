var { URL } = require('url');

/**
 * Parse your data into a Clarifai-friendly object or string.
 * @param {string} _data Your URL/Data URL/Base64 string
 * @returns {(string|Object)} Clarifai-friendly string/object
 */
function dataParser(_data) {
    var data = _data.trim();
    var isBase64String = false;
    var isURL = false;
    var isDataURL = false;

    // Base64 string test
    if (data.match(/^[A-Za-z0-9+\/=]+$/))
        isBase64String = true;

    // URL test
    try {
        new URL(data);
        isURL = true;
    } catch (e) {
        if (e.code != "ERR_INVALID_URL") { // The error is not related to an invalid URL
            throw e;
        }
    }

    // Data URL test
    var regex = /^data:(.+)\/(.+);base64,(.*)$/;
    var matches = data.match(regex);
    if (matches) {
        if (matches[1] === "image") {
            if (matches[2] === "jpeg" || matches[2] === "png" || matches[2] === "tiff" || matches[2] === "webp") {
                isDataURL = true;
            } else {
                throw new TypeError("Invalid image type.");
            }
        } else {
            throw new TypeError("Invalid data type.");
        }
    }

    if (isDataURL) {
        return {
            base64: matches[3]
        }
    } else if (isURL) {
        return data;
    } else if (isBase64String) {
        return {
            base64: data
        }
    } else {
        throw new TypeError("Couldn't recognize data type.");
    }
}

module.exports = dataParser;