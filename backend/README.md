# Trust Backend Demo

This backend is used a Trust SDK demo

# Installation

```
# install dependencies
npm ci

# Run locally
npm run start
```

# Description

This mini backend shows how to use the Trust SDK.
Simply install the library on any NodeJS server
(more info: https://github.com/TheOutsidersLab/trust-nodejs-sdk)
and expose whatever function you need on your API, or internally use it in your
business logic.

All you need to do is:

```js
import Trust from '@theoutsiderslab/trust-nodejs-sdk'

const $trust = new Trust(/* my Starton API_KEY*/)
```

# Tips

This server doesn't hold any Starton API_KEY,
simplify send yours to each available routes by sending ```x-api-key```  header
