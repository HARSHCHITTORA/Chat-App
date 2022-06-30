
import React from "react";
import './styles/main.scss'
import 'rsuite/dist/styles/rsuite-default.css';
import { Switch } from "react-router";
import Signin from './pages/Signin'
import PrivateRoute from './components/PrivateRoutes'
import PublicRoute from './components/PublicRoute'
import Home from './pages/Home'

function App() {
  return (
   <Switch>
    <PublicRoute path='/signin'>
       <Signin/>
    </PublicRoute>

    <PrivateRoute path='/'>
      <Home/>
    </PrivateRoute>
   </Switch>
  );
}

export default App;
