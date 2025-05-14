import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Add a catch-all route for 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Basic 404 component - create this as a separate component for better organization
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-medium">404 - Page Not Found</h1>
    </div>
  );
}

export default App;