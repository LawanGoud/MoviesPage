import React from "react";
import "./index.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate the range of page numbers to display
  const startPage = Math.max(1, currentPage - 4); // Ensure at least 5 page numbers before the current page
  const endPage = Math.min(totalPages, startPage + 9); // Display up to 10 page numbers

  // Generate an array of page numbers within the range
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <button
            onClick={() => onPageChange(number)}
            className={`page-link ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
