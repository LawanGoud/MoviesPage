import React, { useState, useEffect } from "react";
import MovieItem from "../MovieItem";
import Pagination from "../Pagination";

const MoviesList = ({ searchQuery }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (typeof searchQuery === "string") {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery === "") {
        fetchPopularMovies(currentPage);
      } else {
        fetchSearchResults(trimmedQuery, currentPage);
      }
    }
  }, [searchQuery, currentPage]);

  const fetchPopularMovies = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=381d893a76a1ae462a2c258e657e0d96&language=en-US&page=${page}`
      );
      const data = await response.json();
      const updatedData = data.results.map((eachItem) => ({
        id: eachItem.id,
        title: eachItem.title,
        imageUrl: eachItem.poster_path,
        rating: eachItem.vote_average,
      }));
      setMoviesData(updatedData);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      setIsLoading(false);
    }
  };

  const fetchSearchResults = async (query, page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=381d893a76a1ae462a2c258e657e0d96&language=en-US&query=${query}&page=${page}`
      );
      const data = await response.json();
      const updatedData = data.results.map((eachItem) => ({
        id: eachItem.id,
        title: eachItem.title,
        imageUrl: eachItem.poster_path,
        rating: eachItem.vote_average,
      }));
      setMoviesData(updatedData);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (moviesData.length === 0) {
    return <p>Show Message: Movies Not Found(Upload Image Pending)</p>;
  }

  return (
    <div>
      <div className="movie-list-container">
        {moviesData.map((item) => (
          <MovieItem key={item.id} blogData={item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MoviesList;
