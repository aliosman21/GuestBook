import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SignIn from "../Views/SignIn";
import SignUp from "../Views/SignUp";
import List from "../Views/List";
import Messages from "../Views/Messages";
import Message from "../Views/Message";
import { useSelector } from "react-redux";
function GuestBookRouter() {
   const token = useSelector((state) => state.tokenStore.token);
   return (
      <>
         <Routes>
            <Route path="/" exact element={<SignIn />} />
            <Route path="/register" exact element={<SignUp />} />
            <Route path="/users" exact element={token ? <List /> : <Navigate to="/" />} />
            <Route path="/messages" exact element={token ? <Messages /> : <Navigate to="/" />} />
            <Route path="/message" exact element={token ? <Message /> : <Navigate to="/" />} />
         </Routes>
      </>
   );
}

export default GuestBookRouter;
