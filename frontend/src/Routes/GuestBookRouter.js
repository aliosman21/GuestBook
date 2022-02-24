import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SignIn from "../Views/SignIn";
import List from "../Views/List";
import { useSelector } from "react-redux";
function GuestBookRouter() {
   const token = useSelector((state) => state.tokenStore.token);
   return (
      <>
         <Routes>
            <Route path="/" exact element={<SignIn />} />
            <Route path="/users" exact element={token ? <List /> : <Navigate to="/" />} />
         </Routes>
      </>
   );
}

export default GuestBookRouter;
