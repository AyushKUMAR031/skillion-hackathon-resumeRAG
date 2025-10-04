import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import FileUpload from './components/FileUpload';
import Search from './components/Search';
import Jobs from './components/Jobs';
import Candidates from './components/Candidates';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/search" element={<Search />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/candidates/:id" element={<Candidates />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;