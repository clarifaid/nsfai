# nsfai [![Codacy Badge](https://api.codacy.com/project/badge/Grade/804e9bc29c07420aa682247ed0618839)](https://www.codacy.com/app/moriczgergo/nsfai?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bbyjins/nsfai&amp;utm_campaign=Badge_Grade)  ![Discord](https://img.shields.io/discord/434373420814172169.svg)
![nsfai banner logo](https://bbyjins.skiilaa.me/img/nsfai/tinybanner.png)

A simplified wrapper around Clarifai's NSFW detection.

# Features

 * Simplified result. (example.: `{ sfw: true, confidence: 0.9034682 }`);
 * Automatic data recognition, wheter it's Base64, a Data URL, or a URL.

# Example

```js
var NSFAI = require('nsfai');

var nsfai = new NSFAI("YOUR_CLARIFAI_API_KEY_HERE");

function handleResult(result) {
    if (result.sfw) {
        console.log(`This image is A-OK with a confidence of ${result.confidence}.`);
    } else {
        console.log(`This image is NSFW with a confidence of ${result.confidence}.`);
    }
}

nsfai.predict("https://example.com/example.png", handleResult); // URL
// or //
nsfai.predict("data:image/png;base64,dGhpc2lzbm90YW5pbWFnZQ==", handleResult); // Data URL
// or //
nsfai.predict("dGhpc2lzbm90YW5pbWFnZQ==", handleResult); // Base64
```

# Installation

`npm install -s nsfai`