const path = require('path'),
      express = require('express');

const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})