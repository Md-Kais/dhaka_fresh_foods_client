
import './App.css';
import AppSidebar from './Component/AppSidebar.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,


} from "react-router-dom";
import AddProduct from './Component/AddProduct/AddProduct';
import Home from './Component/Home/Home';
import Orders from './Component/Orders/Orders.js';
import NavAppBar from './Component/NavAppBar/NavAppBar';
import Login from './Component/Login/Login';
import { createContext, useState } from 'react';
import Admin from './Component/Admin/Admin';

import Shipment from './Component/Shipment/Shipment';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});


 
  return (

    <>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
        <Router>
        
          <Route exact path="/">
            <NavAppBar />
            <Home></Home>
          </Route>
          <Switch>
            <PrivateRoute  path="/orders">
              <NavAppBar />
              <Orders></Orders>
            </PrivateRoute>
            <PrivateRoute  path="/shipment">
              <NavAppBar />
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path="/login">
              <NavAppBar />
              <Login></Login>
            </Route>


            <PrivateRoute path="/admin">
              <AppSidebar></AppSidebar>
              <Admin></Admin>
            </PrivateRoute>
            <PrivateRoute path="/addProducts">
              <AppSidebar></AppSidebar>
              <AddProduct></AddProduct>
            </PrivateRoute>

          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
