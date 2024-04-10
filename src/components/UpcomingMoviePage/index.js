import React, { Component } from "react";
import MovieItem from "../MovieItem";
import Pagination from "../Pagination";

class MoviesList extends Component {
  state = {
    moviesData: [],
    currentPage: 1, // Initialize current page to 1
    totalPages: 0, // Initialize total pages to 0
  };

  componentDidMount() {
    this.getMoviesData();
  }

  getMoviesData = async () => {
    const { currentPage } = this.state; // Get current page from state
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=381d893a76a1ae462a2c258e657e0d96&language=en-US&page=${currentPage}`
    );
    const data = await response.json();
    const updatedData = data.results.map((eachItem) => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.poster_path,
      rating: eachItem.vote_average,
    }));
    this.setState({ moviesData: updatedData, totalPages: data.total_pages });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.getMoviesData(); // Fetch movies data when page changes
    });
  };

  render() {
    const { moviesData, currentPage, totalPages } = this.state;
    return (
      <div>
        <div className="movie-list-container">
          {moviesData.map((item) => (
            <MovieItem blogData={item} key={item.id} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default MoviesList;
