import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useAuth } from './context/AuthContext';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
        Loading...
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
