import React from "./node_modules/react";
import { Link } from "./node_modules/react-router-dom";

const NotFound = () => (
  <>
    <h2>Page not found</h2>
    <Link to="/">Go home</Link>
  </>
);

export default NotFound;
