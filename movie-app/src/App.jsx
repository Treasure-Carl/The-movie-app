import React, { useEffect, useState,} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import MovieList from './component/MovieList';
import MovieListHeading from './component/MovieListHeading';
import SearchBox from './component/SearchBox';
import AddFavourite from './component/AddFavourite';
import RemoveFavourites from './component/RemoveFavourite';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('');
  
  const getMovieRequest = async (searchValue)=> {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=16bc9cd2`;
    const response = await fetch(url);
    const responseJson = await response.json();

    // console.log(responseJson);
    if(responseJson.Search){
    setMovies(responseJson.Search);
  }
  };

 useEffect(()=>{
  getMovieRequest(searchValue);
 }, [searchValue]);



//  useEffect(()=>{
//   const movieFavourites = JSON.parse(
//     localStorage.getItem('react-movie-app-favourites')
//   );

//   setFavourites(movieFavourites);
//  }, []);

//  const saveToLocalStorage = (items) => {
//   localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
//  }



 const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList)
 }

 const removeFavouriteMovie = (movie)=>{
const newFavouriteList = favourites.filter((favourite)=> favourite.imdbID !== movie.imdbID);

setFavourites(newFavouriteList);
 };

  return (
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
   <MovieListHeading heading='Movies'/>
   <SearchBox  searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className='d-flex flex-row mb-3'>
<MovieList movies={movies} handleFavouriteClick={addFavouriteMovie} favouriteComponent = {AddFavourite}/>
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
   <MovieListHeading heading='Favourites'/>
   </div>
   <div className='d-flex flex-row mb-3'>
<MovieList movies={favourites} 
handleFavouriteClick={removeFavouriteMovie} 
favouriteComponent = {RemoveFavourites}/>
 </div>
   
    </div>
    
  );
 };

export default App;
