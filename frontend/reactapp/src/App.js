import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Error from './components/Error';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path='/products' component={Products} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/error' component={Error} />
          <Redirect exact from='/' to='/products'></Redirect>
          <Redirect from="*" to="/error"></Redirect>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
