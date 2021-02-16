import { Link } from 'react-router-dom';

export const ErrorPage = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);
