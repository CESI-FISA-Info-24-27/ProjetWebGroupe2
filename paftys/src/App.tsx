import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<h1>ntm</h1>} />
        </Routes>
      </Router>
  );
};

export default App;
