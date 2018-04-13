var expect = require("chai").expect;

var dataParser = require("../lib/dataparser");

describe("dataParser", function() {
    it("should process a Base64 Data URL", function() {
        var testBase64 = "aGVsbG8hIHRoYW5rcyBmb3IgcHV0dGluZyBpbiBlZmZvcnQgdG8gZGVjb2RpbmcgdGhpcywgYnV0IHlvdSdyZSB3YXN0aW5nIHRpbWUuLi4gZ290dGEgYmUgcHJvZHVjdGl2ZSEgOikgOykgKGFsc28gSSBrbm93IHRoaXMgaXMgbm90IGEgcmVhbCBpbWFnZSwgSSBkaWRuJ3QgbWVhbiBpdCB0byBiZSBvbmUuKQ==";
        var dataURL = `data:image/png;base64,${testBase64}`;

        var testFunct = function() { return dataParser(dataURL); };
        expect(testFunct).to.not.throw(Error);

        var testResult = testFunct();
        expect(testResult).to.be.an("Object").and.to.haveOwnProperty("base64", testBase64);
    });

    it("should filter non-supported Base64 Data URLs", function() {
        var testBase64 = "aGVsbG8hIHRoYW5rcyBmb3IgcHV0dGluZyBpbiBlZmZvcnQgdG8gZGVjb2RpbmcgdGhpcywgYnV0IHlvdSdyZSB3YXN0aW5nIHRpbWUuLi4gZ290dGEgYmUgcHJvZHVjdGl2ZSEgOikgOykgKGFsc28gSSBrbm93IHRoaXMgaXMgbm90IGEgcmVhbCBpbWFnZSwgSSBkaWRuJ3QgbWVhbiBpdCB0byBiZSBvbmUuKQ==";
        var dataURL = `data:image/gif;base64,${testBase64}`;

        var testFunct = function() { return dataParser(dataURL); };
        expect(testFunct).to.throw(TypeError);
    });

    it("should process Base64", function() {
        var testBase64 = "aGVsbG8hIHRoYW5rcyBmb3IgcHV0dGluZyBpbiBlZmZvcnQgdG8gZGVjb2RpbmcgdGhpcywgYnV0IHlvdSdyZSB3YXN0aW5nIHRpbWUuLi4gZ290dGEgYmUgcHJvZHVjdGl2ZSEgOikgOykgKGFsc28gSSBrbm93IHRoaXMgaXMgbm90IGEgcmVhbCBpbWFnZSwgSSBkaWRuJ3QgbWVhbiBpdCB0byBiZSBvbmUuKQ==";

        var testFunct = function() { return dataParser(testBase64); };
        expect(testFunct).to.not.throw(Error);

        var testResult = testFunct();
        expect(testResult).to.be.an("Object").and.to.haveOwnProperty("base64", testBase64);
    });

    it("should process URLs", function() {
        var testURL = "https://example.com/logo.png";

        var testFunct = function() { return dataParser(testURL); };
        expect(testFunct).to.not.throw(Error);

        var testResult = testFunct();
        expect(testResult).to.equal(testURL);
    });

    it("shouldn\'t accept nonsensical data", function() {
        var testData = "'+!'+!'+!'+!'?:'+?'!+'!+'??gdfgdfgdsfGDFgdsgdsf7576sw5fs";

        var testFunct = function() { return dataParser(testData); };
        expect(testFunct).to.throw(TypeError);
    });
});
