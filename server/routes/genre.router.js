const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/details/:id', (req, res) => {
//SQL query gets the movie name and genre.
const queryText = 
  `SELECT movies.title, genres.name FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON movies_genres.genre_id=genres.id
  WHERE movies.id =$1`;
pool.query(queryText, [req.params.id])
  .then((result) => { res.send(result.rows); })
  .catch((err) => {
    console.log('Error completing SELECT movie query', err);
    res.sendStatus(500);
  });
});



module.exports = router;





