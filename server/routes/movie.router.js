const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/details/:id', (req, res) => {
  const queryText = 'SELECT * FROM movies WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT movies query', err);
      res.sendStatus(500);
    });
});


router.post('/', (req, res) => {
  console.log(req.body);
  
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

 
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); 
    
    const createdMovieId = result.rows[0].id

   
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
     
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;