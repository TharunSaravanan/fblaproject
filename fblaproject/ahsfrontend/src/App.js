
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar';
import Home from './components/Home';
import Student from './components/Student';
import Points from './components/Points';

function App() {
  return (
      <Router>
        <div className="App">
          <Appbar/>

          <Routes>
            <Route exact path="/" element={ <Home />} />
            <Route path="/points" element={ <Points /> } />
            <Route path="/student" element={ <Student /> } />
          </Routes>
        </div>
      </Router>
  );
}


export default App;
