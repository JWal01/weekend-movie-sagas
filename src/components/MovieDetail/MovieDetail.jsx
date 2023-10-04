import {useParams, useHistory} from "react-router-dom"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";



const MovieDetail = () => {
  
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  
  //Access movies from the store
  const movie = useSelector(store => store.selectmovie);
  //Access genres from the store
  const genres = useSelector(store => store.genres)
  
  useEffect(() => {

    dispatch({ type: 'FETCH_DETAIL', payload: id });
    dispatch({ type: 'FETCH_GENRES', payload: id });
  }, []); 


 
 //using useHistory to bring us back to the home page. 
  const homeButtonClick = () => {
    console.log("home Page");
    history.push('/');
  }; 
  
  return(
    <>
    <div>
        <h1>Movie Details</h1>
          <ul>
            {genres.map((genre, id) => (
            <li key={id}>{genre.genre}</li>
          ))}
            </ul>
           <br></br>
           <br></br>
              <div>
                  <img id="detail-image" src={movie.poster} alt=     {movie.title}/>
                     <p id="description">{movie.description}</p>

              </div>
              <button onClick={homeButtonClick}>Home</button>
    </div>
    </>
  )
};

export default MovieDetail;