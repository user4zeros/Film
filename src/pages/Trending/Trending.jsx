import {unavailable} from '../../Config/Config'
import {Badge , Button, Pagination, ThemeProvider} from "@mui/material"
import { useEffect, useState } from "react";
import './Trending.css'
const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzk1YmExZDFlOTY3NGQwZWZmNWVhMDQ0Mjc5Njg0YyIsInN1YiI6IjY1NTNlZWM5MDgxNmM3MDBhYmJiZmFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFdjXUTn-elhfZ4nolLQ8Rgfmgewjm430tAMtjtfqgY'
            }
          };
  
          const response = await fetch(
            `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${currentPage}`  ,
            options
          );
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [currentPage]);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
      };

    return(
    <div>
    <span className="trending ">

        {movies.map((movie) => (
            <div key={movie.id} className='media'>
                <Badge badgeContent={movie.vote_average} color={movie.vote_average>6 ? "primary" : "secondary"}/> 
            <img className='poster'
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : unavailable}
              alt={movie.title}
            />
            <h3 className='title'> {movie.title}</h3>
            <div className='subTitle'>
            <div className=''>{movie.first_air_date || movie.release_date} </div>
            <div className=''>{movie.media_type === 'tv' ? 'TV Serie' : "Movie"}</div>
            
            </div>
            <div className='button'>
            </div>
          </div>
        ))}
    </span>
    <div >
    <Pagination className='pagination' count={10} shape="rounded" page={currentPage} onChange={handlePageChange}/> 
    </div> 
     </div>
    )
}
export default Trending