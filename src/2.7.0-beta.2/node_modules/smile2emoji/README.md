# Smile2Emoji NPM Module
[![npm version](https://badge.fury.io/js/smile2emoji.svg)](https://badge.fury.io/js/smile2emoji)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Femish89%2Fsmile2emoji.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Femish89%2Fsmile2emoji?ref=badge_shield)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/8bdab2e8ea80f30811bd/maintainability)](https://codeclimate.com/github/emish89/smile2emoji/maintainability)

![smile2emoji](https://socialify.git.ci/emish89/smile2emoji/image?font=Raleway&forks=1&language=1&owner=1&stargazers=1&theme=Dark)

**Convert all the smiley to fantastic emoticons!** ✨

With this simple and little module you can convert the smiles in your text to emoji.
:) or :D or <3 will become emoticons!
Ideal for input, chats and so on, where you don't want an emoji picker but a simpler solution.

Very quick test usage: 
https://codepen.io/emish89/pen/YzGrvVK

Happy usage =)

# Installation

```
npm i smile2emoji
```

# Usage

Right now, there are 2 simple ways to use it.


With the function to get the data from the map:

```
import { checkText } from 'smile2emoji'

...

const text = checkText(':)');
console.log(text) //prints '😊'

//OR 

const text = checkText('i like bananas :)');
console.log(text) //prints 'i like bananas 😊'

```



Or from the map:
```
import { emojiMap } from 'smile2emoji'

...

const text = ':)';
const emoji = emojiMap[text];
console.log(emoji) //prints '😊'

```



# License

MIT © Federico Ballarini


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Femish89%2Fsmile2emoji.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Femish89%2Fsmile2emoji?ref=badge_large)
