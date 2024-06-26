let express = require('express');
let cors = require('cors');
const fs = require('fs');
let token = require('./src/auth.js').token;

const moviesFilepath = './movies.json';
let api = express();
api.use(cors());

let bodyParser = require('body-parser');
api.use(
  bodyParser.urlencoded({
    extended: true
  })
);
api.use(bodyParser.json());

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/movies', function (request, response) {
  response.json(getMovies());
});

api.get('/movies/:id', function (request, response) {
  response.json(getMovie(
    request.params.id
  ));
});

api.delete('/movies/:id', function (request, response) {
  response.json({status:"delete"})
});


function getMovie (id){
  let movies = getMovies();
  let movie = {};
  for(let i = 0; i < movies.length; i++ ){
    if(movies[i].id == id){
      movie = movies[i]
    }
  }
  return movie
}

function getMovies() {
  let cars = [];
  try {
    cars = JSON.parse(fs.readFileSync(moviesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return cars;
}

api.post('/login', function (request, response) {
  if(request.body.username.length > 2 && 
    request.body.password === '321access') {
    response.json({status: 'ALLOW', token: token()});
  } else {
    response.json({status: 'DENY'});
  }
});

api.listen(3000, function () {
    console.log('Server running @ localhost:3000');
  });