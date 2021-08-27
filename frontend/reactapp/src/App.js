import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Error from './components/Error';

function App() {
  return (
    <Router>
      <Navbar />
        <main>
          <Switch>
            <Route path={['/products','/products/des/:id']} component={ Products } />
            <Route exact path='/cart' component={ Cart } />
            <Route exact path='/error' component={Error} />
            <Redirect from="*" to="/error"></Redirect>
          </Switch>
        </main>
    </Router>
  );
}

export default App;
