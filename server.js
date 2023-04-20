const express = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./server/routes/api');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'dist/quiz-maker')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/quiz-maker/index.html'));
})

app.set('port', PORT);

app.listen(PORT, () => {
  console.log(`Server running on localhost ${PORT}`);
})