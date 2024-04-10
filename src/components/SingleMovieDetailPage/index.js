import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

function SingleMovieDetailPage() {
  const [movieData, setMovieData] = useState({
    genres: [],
  });
  const [castData, setCastData] = useState([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingCast, setLoadingCast] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getMovieItemData();
    getCastDetails();
  }, [id]);

  const getMovieItemData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=381d893a76a1ae462a2c258e657e0d96&language=en-US`
      );
      const data = await response.json();
      const updatedData = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        imageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        title: data.original_title,
        runtime: data.runtime,
        rating: data.vote_average,
        genres: data.genres || [],
        releaseDate: data.release_date,
        overview: data.overview,
      };
      setMovieData(updatedData);
      setLoadingMovie(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const getCastDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=381d893a76a1ae462a2c258e657e0d96&language=en-US`
      );
      const data = await response.json();
      const updatedData = data.cast.map((castMember) => ({
        imageUrl: `https://image.tmdb.org/t/p/w500${castMember.profile_path}`,
        name: castMember.original_name,
        character: castMember.character,
      }));
      setCastData(updatedData);
      setLoadingCast(false);
    } catch (error) {
      console.error("Error fetching cast data:", error);
    }
  };

  const renderBlogItemDetails = () => {
    const {
      backgroundImage,
      imageUrl,
      title,
      runtime,
      rating,
      genres,
      releaseDate,
      overview,
    } = movieData;
    return (
      <div className="blog-container">
        <div style={{ backgroundImage }}>
          <div className="movie-details">
            <img className="movie-poster" src={imageUrl} alt={title} />
            <div className="movie-info">
              <h2 className="movie-title">{title}</h2>
              <p className="movie-rating">Rating: {rating}/10</p>
              <p className="movie-runtime">Runtime: {runtime} minutes</p>
              {genres.length > 0 && (
                <p className="movie-genres">
                  Genres: {genres.map((genre) => genre.name).join(", ")}
                </p>
              )}
              <p className="movie-release">Release Date: {releaseDate}</p>
            </div>
          </div>
          <div className="movie-overview">
            <h1 className="overview-heading">Overview</h1>
            <p className="overview-content">{overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCastDetails = () => {
    return (
      <div className="cast-container">
        <h1>Cast</h1>
        <div className="cast-list">
          {castData.map((castMember, index) => (
            <div className="cast-item" key={index}>
              <img
                className="cast-image"
                src={castMember.imageUrl}
                alt={castMember.name}
              />
              <div className="cast-details">
                <p className="cast-name">{castMember.name}</p>
                <p className="cast-character">{castMember.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loadingMovie || loadingCast) {
    return <div>Loading...(Spinner Pending)</div>;
  }

  return (
    <>
      {renderBlogItemDetails()}
      {renderCastDetails()}
    </>
  );
}

export default SingleMovieDetailPage;
