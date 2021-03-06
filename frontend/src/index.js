import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import GuestBookRouter from "./Routes/GuestBookRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import Alert from "./Component/Alert";
import Navbar from "./Component/NavBar"
ReactDOM.render(
   <Provider store={store}>
      <Router>
      <Navbar/>
         <GuestBookRouter />
      </Router>
      <Alert/>
   </Provider>,
   document.getElementById("root")
);
