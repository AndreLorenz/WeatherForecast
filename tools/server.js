import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('public'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
