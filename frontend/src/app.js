import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MovieList} />
          <Route path="/add" component={MovieForm} />
          <Route path="/edit/:id" component={MovieForm} />
          <Route path="/details/:id" component={MovieDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
