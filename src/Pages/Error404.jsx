import React from "react";

function Error404() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="container text-center">
        <h1 className="display-1">404</h1>
        <h2 className="display-4">Page Not Found</h2>
        <p className="lead">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default Error404;
