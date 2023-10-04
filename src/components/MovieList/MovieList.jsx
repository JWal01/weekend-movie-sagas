import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './MovieList.css'



function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

 //
 const handleClick = (id) => {
    //Dispatch the payload of id to rootsaga.
    dispatch({ type: 'FETCH_DETAIL', payload: id });
    dispatch({ type: 'FETCH_GENRES', payload: id });

    history.push(`/details/${id}`);
  }; 

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={() => handleClick(movie.id) } src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;