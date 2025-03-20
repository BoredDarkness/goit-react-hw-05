import React, { useEffect, useState } from "react";
import {
  useParams,
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";
import styles from ".//MovieDetailsPage.module.css";

const API_BASE = "https://api.themoviedb.org/3";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/movie/${movieId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE5YmM1NmQ1YjNjMjRhYTBhM2E1NmZkOGMwZmFjMiIsIm5iZiI6MTc0MjQxODIwOS4yOTMsInN1YiI6IjY3ZGIzMTIxMDg3NDllZmUzNGU3ODQyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R5JWbshIqjaVhWGUTN2DIQEV7xvuW0XoyHkywEmoRG4",
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go back
      </button>
      <h2 className={styles.movieTitle}>{movie.title}</h2>
      {posterUrl && (
        <img src={posterUrl} alt={movie.title} className={styles.poster} />
      )}
      <p className={styles.overview}>{movie.overview}</p>

      <hr />
      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul className={styles.additionalList}>
          <li>
            <NavLink
              to={`/movies/${movieId}/cast`}
              state={{ from: location.state?.from }}
              className={styles.additionalLink}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/movies/${movieId}/reviews`}
              state={{ from: location.state?.from }}
              className={styles.additionalLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
