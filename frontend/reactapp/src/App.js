import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar />
        <main>
          <Switch>
            <Route exact path='/' component={ Products } />
            <Route path='/cart' component={ Cart } />
          </Switch>
        </main>
    </Router>
  );
}

export default App;