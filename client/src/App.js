import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { userLoginHelper, userLogout } from './redux/actions/userAction'
import setAuthToken from './redux/helper/setAuthToken'
import store from './redux/store'
import {useSelector } from 'react-redux'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

if (window.localStorage.userJwtToken) {
  setAuthToken(localStorage.userJwtToken);
  const decoded = jwt_decode(localStorage.userJwtToken);
  store.dispatch(userLoginHelper(decoded))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    window.location.href = '/';
  }
}



const App = () => {
  const reduxData  = useSelector(store => store.userRoot)
  const {isAuthenticated} = reduxData
  return (
    <div>
      <Router>
        <Switch>
          {isAuthenticated ?  
            <>
              <Redirect to="/home"/>
              <Route exact path='/home' component={Home} />
            </>
          :
            <>
              <Route exact path='/' component={Login} />
              <Route exact path='/sign-up' component={Register} />
              </>
           }
        </Switch>
      </Router>
    </div>
  )
}

export default App
