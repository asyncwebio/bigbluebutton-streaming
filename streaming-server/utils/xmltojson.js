//  XML to JSON in node.js

const xml2js = require('xml2js');

const xmlToJson = (xml) => {
    let result = null;
    xml2js.parseString(xml, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        result = res;
    });
    return result;
};



module.exports = xmlToJson;