import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./HomePage.module.css";

const API_BASE = "https://api.themoviedb.org/3";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/trending/movie/day`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE5YmM1NmQ1YjNjMjRhYTBhM2E1NmZkOGMwZmFjMiIsIm5iZiI6MTc0MjQxODIwOS4yOTMsInN1YiI6IjY3ZGIzMTIxMDg3NDllZmUzNGU3ODQyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R5JWbshIqjaVhWGUTN2DIQEV7xvuW0XoyHkywEmoRG4",
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
