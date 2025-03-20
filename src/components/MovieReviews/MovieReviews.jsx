import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const API_BASE = "https://api.themoviedb.org/3";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/movie/${movieId}/reviews`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE5YmM1NmQ1YjNjMjRhYTBhM2E1NmZkOGMwZmFjMiIsIm5iZiI6MTc0MjQxODIwOS4yOTMsInN1YiI6IjY3ZGIzMTIxMDg3NDllZmUzNGU3ODQyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R5JWbshIqjaVhWGUTN2DIQEV7xvuW0XoyHkywEmoRG4",
        },
      })
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <p className={styles.reviewAuthor}>{review.author}:</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default MovieReviews;
