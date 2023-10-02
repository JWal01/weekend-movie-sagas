import {useParams, useHistory} from "react-router-dom"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";



const MovieDetail = () => {
  
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    console.log('in useEffect');
    const action = { type: '', payload: id};
    dispatch(action);
  }, []);
 
  const homeButtonClick = () => {
    console.log("home Page");
    history.push('/');
  }; 
  
  return(
    <>
    <h1>Movie Details</h1>
    <p> {movies.description} </p>
    <br></br>
    <button onClick={homeButtonClick}>Home</button>
    </>
  )
};

export default MovieDetail;