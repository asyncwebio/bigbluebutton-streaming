"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _all = _interopRequireDefault(require("../../../data/all.json"));

var _nimbleEmojiIndex = _interopRequireDefault(require("./nimble-emoji-index"));

var emojiIndex = new _nimbleEmojiIndex["default"](_all["default"]);
var emojis = emojiIndex.emojis,
    emoticons = emojiIndex.emoticons;

function search() {
  return emojiIndex.search.apply(emojiIndex, arguments);
}

var _default = {
  search: search,
  emojis: emojis,
  emoticons: emoticons
};
exports["default"] = _default;