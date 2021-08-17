import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar />
        <main>
          <Switch>
            <Route path='/' component = { Products }/>
          </Switch>
        </main>
    </Router>
  );
}

export default App;
