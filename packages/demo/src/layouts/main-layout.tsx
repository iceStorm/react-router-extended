import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b py-5">
        <nav className="container">Header</nav>
      </header>

      <main className="container flex-1 py-5">
        <Suspense fallback={<ClipLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="border-t py-5">
        <div className="container">Footer</div>
      </footer>
    </div>
  );
};
