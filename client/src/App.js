import './App.css'
import Home from './Pages/Home'
import CreatePasswordComponent from './Pages/CreatePasswordComponent'
import PasswordListComponent from './Pages/PasswordListComponent'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <ul className="flex justify-center py-4">
            <li className="mr-3">
              {/* exact vergleicht mit aufgerufenem link */}
              <NavLink
                activeClassName="activeLink"
                className="Link"
                exact
                to="/"
              >
                Home Page
              </NavLink>
            </li>
            <li className="mr-3">
              <NavLink
                activeClassName="activeLink"
                className="Link"
                to="/createpassword"
                exact
              >
                Create A Password
              </NavLink>
            </li>
            <li className="mr-3">
              <NavLink
                activeClassName="activeLink"
                className="Link"
                to="/passwordlist"
                exact
              >
                Passwordlist
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/createpassword"
            exact
            component={CreatePasswordComponent}
          />
          <Route path="/passwordlist" exact component={PasswordListComponent} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
