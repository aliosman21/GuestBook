import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import GuestBookRouter from "./Routes/GuestBookRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import Store from "./Redux/Store";
import { Provider } from "react-redux";
ReactDOM.render(
   <Provider store={Store}>
      <Router>
         <GuestBookRouter />
      </Router>
   </Provider>,
   document.getElementById("root")
);
