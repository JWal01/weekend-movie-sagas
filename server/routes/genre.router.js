const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// router.get('/', (req, res) => {
//   // Add query to get all genres
  
// });

router.get('/details/:id', (req, res) => {
  const queryText = 'SELECT * FROM movies WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT movies query', err);
      res.sendStatus(500);
    });
});

module.exports = router;





// SELECT "movies"."title" AS "movie_title",
//  "movies"."description" AS "movie_description", 
//  "movies"."poster" AS "movie_poster", 
//   "genres"."name" AS "genre_name"
// FROM "movies"
// JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
// JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"