
import './App.css';
import AppSidebar from './Component/AppSidebar.js'
import ManageProduct from './Component/ManageProduct/ManageProduct';
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
          <Route exact path="/orders">
            <NavAppBar />
            <Orders></Orders>
          </Route>
        <Route exact path="/login">
          <NavAppBar />
          <Login></Login>
        </Route>
        <Switch>
          <Route  path="/admin">
            <AppSidebar></AppSidebar>
            <Admin></Admin>
          </Route>
          <Route exact path="/addProducts">
            <AppSidebar></AppSidebar>
            <AddProduct></AddProduct>
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
</>
  );
}

export default App;
