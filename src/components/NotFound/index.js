import React from "react";
import "./index.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="https://www.freepik.com/free-vector/404-error-concept-illustration_20892174.htm#fromView=search&page=1&position=1&uuid=6ab2a6ba-29ff-402a-af58-5c78ddc98b36"
        alt="Not Found"
        className="not-found-image"
      />
      <h1 className="not-found-text">404 - Not Found</h1>
    </div>
  );
};

export default NotFound;
