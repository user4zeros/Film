import React, { useState, useEffect } from 'react';
import { Badge, Select, MenuItem, InputLabel, FormControl,Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import '../Trending/Trending.css';
import TextField from '@mui/material/TextField';
import './Modal.css'




              const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(500); // Set initial totalPages to 1
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);

  const toggleModal = (movie) => {
    setModal(!modal);
    setModalMovie(movie);
  };
/**Mdal */

  const [modal, setModal] = useState(false);

if(modal){
  document.body.classList.add('active-modal')
  document.body.classList.add('primary')

}else {
  document.body.classList.remove('active-modal')
  document.body.classList.remove('primary')

}
/** */

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  /*** search */
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movie, setMovie] = useState([]);
    
    const searchMovies = async (e) => {
        e.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=1395ba1d1e9674d0eff5ea044279684c&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
  /*** */

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setCurrentPage(1); // Reset current page to 1 when genres change
    setSelectedGenres(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzk1YmExZDFlOTY3NGQwZWZmNWVhMDQ0Mjc5Njg0YyIsInN1YiI6IjY1NTNlZWM5MDgxNmM3MDBhYmJiZmFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFdjXUTn-elhfZ4nolLQ8Rgfmgewjm430tAMtjtfqgY',
          }
        };

        const genreQuery = selectedGenres.length > 0 ? `&with_genres=${selectedGenres.join(',')}` : '';
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc${genreQuery}`, options);
        const data = await response.json();

        setMovies(data.results);

        // Calculate total pages based on the number of movies and a fixed number of moviesPerPage

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedGenres]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzk1YmExZDFlOTY3NGQwZWZmNWVhMDQ0Mjc5Njg0YyIsInN1YiI6IjY1NTNlZWM5MDgxNmM3MDBhYmJiZmFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFdjXUTn-elhfZ4nolLQ8Rgfmgewjm430tAMtjtfqgY',
          }
        };

        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
        const data = await response.json();
        
        setAllGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    //azeazeae
    <div>
        
        <form className="form" onSubmit={searchMovies}>
        <TextField 
      className="input"
      type="text"
      label="Search"
      placeholder="i.e. Jurassic Park"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
            <Button style={{}} type="submit">
            

                Search</Button>
        </form>
       <br/>
      <span className='trending'>
        <FormControl fullWidth>
          <InputLabel htmlFor="genres">Select Genres:</InputLabel>
          <Select
            id="genres"
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
            label="Select Genres"
            
          >
            {allGenres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="trending">
          
        {movies.map((movie) => (
        <div className='media btn-modal' key={movie.id} onClick={() => toggleModal(movie)}>
                            <Badge className='badge' badgeContent={movie.vote_average} color={movie.vote_average > 6 ? 'primary' : 'secondary'} />

                            <img
                              className='poster'
                              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'unavailable'}
                              alt={movie.title}
                            />
                            
                            <h2 className='title'>{movie.title}</h2>
                            <p className='subTitle'>Date: {movie.release_date}</p>
                         

                        </div>
                          
                          
                        ))}
                           {modal && modalMovie && (
        <div className="modal" key={modalMovie.id}>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <img
              className='modal-poster'
              src={modalMovie.poster_path ? `https://image.tmdb.org/t/p/w500${modalMovie.poster_path}` : 'unavailable'}
              alt={modalMovie.title}
            />
            <div className='modal-title'>
             <h2>{modalMovie.title}</h2>
             <h3>{modalMovie.overview}</h3>
             </div>
                 <button className="close-modal" onClick={toggleModal}>
               CLOSE
             </button>
           </div>
                        </div>
                        )}
                        <p>Lorem ipsum dolor sit amet</p>
                        </div>
        
      </span>
      <div>
        <Pagination className='pagination' count={totalPages} shape='rounded' page={currentPage} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MovieList;
