import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    return(
        <> 
        {props.movies.map((movie, index)=> (
        <div className='d-flex justify-content-start m-3 image-container'>
           <img id='imgg' src={movie.Poster} alt='movie'></img>
           <div onClick={()=>props.handleFavouriteClick(movie)} 
           className="overlay d-flex align-items-center justify-content">
           
           <FavouriteComponent />
           </div>
        
         </div>
        ))}
        </>
    );
};

export default MovieList;