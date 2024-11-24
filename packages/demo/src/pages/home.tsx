import { Link } from 'react-router-dom';

import { AppFlattendRoutes } from '../router';

export default function HomePage() {
  return (
    <div>
      <h1>Home page.</h1>

      {/* use the AppRoutes to navigate */}
      <Link to={AppFlattendRoutes.about.path} className="underline">
        Go to About
      </Link>
    </div>
  );
}
