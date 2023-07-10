const crypto = require("hash.js")

function getChecksum(callName, queryParams, sharedSecret) {
  return crypto["sha1"]()
    .update(`${callName}${new URLSearchParams(queryParams).toString()}${sharedSecret}`)
    .digest("hex");
}

function constructUrl(bbb, action, params) {

  params.checksum = getChecksum(action, params, bbb.salt);

  return `${bbb.host}/api/${action}?${new URLSearchParams(params).toString()}`;
}



module.exports = constructUrl