import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <div className="App bg-light min-vh-100">
      <header className="bg-primary text-white text-center py-4 shadow-sm">
        <h3 className="mb-0">Intern Application Portal</h3>
      </header>

      <main >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
