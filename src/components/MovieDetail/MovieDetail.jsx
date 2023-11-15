import {useParams, useHistory} from "react-router-dom"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './MovieDetail.css'



function MovieDetail(){
  
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  

  const movie = useSelector(store => store.selectMovie);
  const genres = useSelector(store => store.genres)

   
   const homeButtonClick = () => {
    console.log("home Page");
    history.push('/');
  }; 
  
  useEffect(() => {

    dispatch({ type: 'FETCH_DETAIL', payload: id });
    dispatch({ type: 'FETCH_GENRE', payload: id });
  }, []); 


 
 
  
  return(
    <main>
    <div>
        <h1>{movie.title}</h1>
        <div>
          <ul className="genres" >
            {genres.map((genres, id) => (
            <li key={id}>{genres.genres}</li>
          ))}
            </ul>
           <br></br>
           <br></br>
              <div>
                  <img id="detail-image" src={movie.poster} alt={movie.title}/>
                     <p id="description">{movie.description}</p>
         </div>
              </div>
              <button onClick={homeButtonClick}>Home</button>
    </div>
    </main>
    
           
  )
}

export default MovieDetail;