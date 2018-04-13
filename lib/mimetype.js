var allowedMIMETypes = ["image/jpeg", "image/png", "image/tiff", "image/webp"]; // Clarifai's list of allowed image types.

/**
 * Checks if the supplied MIME type is an image that can be used with Clarifai.
 * @param {string} mimeType The MIME type to test
 * @returns {boolean} Whether the image is usable or not.
 */
function testMIMEType(mimeType) {
    return allowedMIMETypes.indexOf(mimeType.trim()) !== -1;
}

module.exports = testMIMEType;