import {useParams} from "react-router-dom"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const MovieDetail = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);


  // useEffect(() => {
  //   console.log(``);
  // }, []);
  
  return(
    <>
    <h1>Movie Details</h1>
    <p> {movies.description} </p>
    </>
  )
};

export default MovieDetail;