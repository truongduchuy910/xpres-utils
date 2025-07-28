##  Usage

To use this template, you can clone the repository and install the dependencies:

```
npm i xpres-utils@latest
```

Then, you can create a simple Express application using the utilities provided by `xpres-utils`. Below is an example of how to set up a basic server that responds with "Hello World!" when accessed at the root URL.

```js
const express = require('express')
const { OK } = require('xpres-utils');
const app = express()
const port = 3000

app.get('/', (_req, res) => {
  res.status(OK).send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
