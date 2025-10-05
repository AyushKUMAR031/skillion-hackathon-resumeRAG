import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from './components/NavBar';
import Home from './components/Home';
import FileUpload from './components/FileUpload';
import Search from './components/Search';
import Jobs from './components/Jobs';
import Candidates from './components/Candidates';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/search" element={<Search />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/candidates/:id" element={<Candidates />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;