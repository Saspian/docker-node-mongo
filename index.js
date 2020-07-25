const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

//connect to mongodb
mongoose
  .connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
  .then(() => console.log('Connected to Database MongoDB'))
  .catch((err) => console.log(err));
const Item = require('./models/item');

app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items });
  } catch (err) {
    res.status(404).json({ msg: 'No item found' });
  }
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.redirect('/'));
});

const port = 3000;
app.listen(port, () => console.log('Server is running...'));
