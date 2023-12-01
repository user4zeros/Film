import React, { useState, useEffect } from 'react';
import {Badge, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MovieList = () => {
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(500);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [query, setQuery] = useState('');

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const searchSeries = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/tv?api_key=1395ba1d1e9674d0eff5ea044279684c&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setSeries(data.results);
    } catch (err) {
      console.error('Error searching series:', err);
    }
  };

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setCurrentPage(1);
    setSelectedGenres(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzk1YmExZDFlOTY3NGQwZWZmNWVhMDQ0Mjc5Njg0YyIsInN1YiI6IjY1NTNlZWM5MDgxNmM3MDBhYmJiZmFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFdjXUTn-elhfZ4nolLQ8Rgfmgewjm430tAMtjtfqgY',
          },
        };
        const genreQuery =
          selectedGenres.length > 0 ? `&with_genres=${selectedGenres.join(',')}` : '';
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc${genreQuery}`,
          options
        );
        const data = await response.json();

        setSeries(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedGenres, query]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzk1YmExZDFlOTY3NGQwZWZmNWVhMDQ0Mjc5Njg0YyIsInN1YiI6IjY1NTNlZWM5MDgxNmM3MDBhYmJiZmFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFdjXUTn-elhfZ4nolLQ8Rgfmgewjm430tAMtjtfqgY',
          },
        };

        const response = await fetch(
          'https://api.themoviedb.org/3/genre/tv/list?language=en',
          options
        );
        const data = await response.json();
        setAllGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <form className="form" onSubmit={searchSeries}>
        <TextField
          className="input"
          type="text"
          label="Search"
          placeholder="i.e. Breaking Bad"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="button" type="submit">
          Search
        </Button>
      </form>
      <br/>
      <span className="trending">
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
        {series.map((serie) => (
          <div key={serie.id} className="media">
            <Badge
              badgeContent={serie.vote_average}
              color={serie.vote_average > 6 ? 'primary' : 'secondary'}
            />
            <img
              className="poster"
              src={
                serie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                  : 'unavailable'
              }
              alt={serie.name}
            />
            <h2 className="title">{serie.name}</h2>
            <p className="subTitle">Date: {serie.first_air_date}</p>
          </div>
        ))}
      </span>
      <div>
        <Pagination
          className="pagination"
          count={totalPages}
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MovieList;
