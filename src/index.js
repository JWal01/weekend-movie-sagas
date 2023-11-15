import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_DETAIL', fetchDetails);
    yield takeEvery('FETCH_GENRE', fetchGenre)
}

function* fetchAllMovies() {
   
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchDetails(action) {
    try{
        const movie = yield axios.get(`/api/movie/details/${action.payload}`);
        
        yield put({ type: 'SET_MOVIE_DETAIL', payload: movie.data[0] })
    }catch (error){
        console.log('error in fetchDetails', error);
    }
};

function* fetchGenre(action) {
    try{
        const genres = yield axios.get(`api/genre/details/${action.payload}`)

        yield put({ type: 'SET_GENRES', payload: genres.data});
        console.log(genres.data);
    }catch (error){
        console.log('error in fetchGenre', error);
    }
}



const sagaMiddleware = createSagaMiddleware();


const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}


const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
// Used to store selected Movie
const selectMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAIL':
            return action.payload;
            default:
                return state;
    }
}



const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectMovie,
    }),
   
    applyMiddleware(sagaMiddleware, logger),
);


sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);

