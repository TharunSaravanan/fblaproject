
import './App.css';
import { BrowserRouter as Router, Switch, 
  Route, Redirect,} from "react-router-dom";

import Appbar from './components/Appbar';
import Home from './components/Home';
import Student from './components/Student';

function App() {
  return (

<>
    <div className="App">
      <Appbar/>
    </div>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Switch>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" component={Home} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/student" component={Student} />
            
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </>


  );
}


export default App;
