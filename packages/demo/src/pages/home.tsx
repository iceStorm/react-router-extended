import { Link } from 'react-router-dom';

import AppRoutes from '../constants/routes';

export default function HomePage() {
  return (
    <div>
      <h1>Home page.</h1>

      {/* use the AppRoutes to navigate */}
      <Link to={AppRoutes.root.children.about.path} className="underline">
        Go to About
      </Link>
    </div>
  );
}
