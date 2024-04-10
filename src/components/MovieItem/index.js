import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const MovieItem = (props) => {
  const { blogData } = props;
  const { id, imageUrl, rating, title } = blogData;
  const ratingOutOfFive = (rating / 2).toFixed(1);

  return (
    <Link to={`/movie/${id}`} className="movie-item-link">
      <div className="item-container">
        <img
          className="item-image"
          src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
          alt={`movie${id}`}
        />
        <p className="item-title">{title}</p>
        <p className="item-rating">{ratingOutOfFive}/5</p>{" "}
      </div>
    </Link>
  );
};

export default MovieItem;
