import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoviesList from "./components/MoviesList";
import TopRatedList from "./components/TopRatedList";
import UpcomingMoviePage from "./components/UpcomingMoviePage";
import NotFound from "./components/NotFound";
import SingleMovieDetailPage from "./components/SingleMovieDetailPage";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<MoviesList searchQuery={searchQuery} />} />
        <Route path="/toprated" element={<TopRatedList />} />
        <Route path="/upcoming" element={<UpcomingMoviePage />} />
        <Route path="/movie/:id" element={<SingleMovieDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
