const express = require('express')
const app = express()
const port = 3001

const model = require('./model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}
function sortingField(sort, response) {
  if (sort.name > 0) {
    if (sort.name == 1) {
      response.sort(byField('name'))
    } else if (sort.name == 2) {
      response.sort(byField('name')).reverse();
    }
  } else if (sort.count > 0) {
    if (sort.count == 1) {
      response.sort(byField('count'))
    } else if (sort.count == 2) {
      response.sort(byField('count')).reverse();
    }
  } else if (sort.distance > 0) {
    if (sort.distance == 1) {
      response.sort(byField('distance'))
    } else if (sort.distance == 2) {
      response.sort(byField('distance')).reverse();
    }
  }
  return response;
}

app.get('/', (req, res) => {
  const page = req.query.page
  const limit = req.query.limit
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const sort = JSON.parse(req.query.sort)

  model.getInfo()
    .then(response => {
      sortingField(sort, response);
      const resultUsers = response.slice(startIndex, endIndex)
      const someObj = {
        length: response.length,
        results: resultUsers,
      }
      res.status(200).send(someObj);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})
app.get('/count', (req, res) => {
  const page = req.query.page
  const limit = req.query.limit
  const head = req.query.head
  const value = req.query.value
  const sort = JSON.parse(req.query.sort)
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  model.getCount(head, value)
    .then(response => {
      sortingField(sort, response);
      const resultUsers = response.slice(startIndex, endIndex)
      const someObj = {
        length: response.length,
        results: resultUsers,
      }
      res.status(200).send(someObj);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})
app.get('/distance', (req, res) => {
  const page = req.query.page
  const limit = req.query.limit
  const head = req.query.head
  const value = req.query.value
  const sort = JSON.parse(req.query.sort)
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  model.getDistance(head, value)
    .then(response => {
      sortingField(sort, response);
      const resultUsers = response.slice(startIndex, endIndex)
      const someObj = {
        length: response.length,
        results: resultUsers,
      }
      res.status(200).send(someObj);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})
app.get('/name', (req, res) => {
  const page = req.query.page
  const limit = req.query.limit
  const head = req.query.head
  const value = req.query.value
  const sort = JSON.parse(req.query.sort)
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  model.getName(head, value)
    .then(response => {
      sortingField(sort, response);
      const resultUsers = response.slice(startIndex, endIndex)
      const someObj = {
        length: response.length,
        results: resultUsers,
      }
      res.status(200).send(someObj);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})