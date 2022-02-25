import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TokenSlice } from "../Redux/TokenSlice";
const NavBar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const token = useSelector((state) => state.tokenStore.token);
   const logout = () => {
      dispatch(TokenSlice.actions.clearAll());
      navigate("/");
   };

   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {token && (
                     <Button
                        onClick={() => navigate("/users")}
                        sx={{ my: 2, color: "white", display: "block" }}>
                        Users
                     </Button>
                  )}
               </Box>

               <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                  {token ? (
                     <Button onClick={logout} sx={{ my: 2, color: "white", display: "block" }}>
                        Logout
                     </Button>
                  ) : (
                     <>
                        <Button
                           onClick={() => navigate("/")}
                           sx={{ my: 2, color: "white", display: "block" }}>
                           Login
                        </Button>
                        <Button
                           onClick={() => navigate("/register")}
                           sx={{ my: 2, color: "white", display: "block" }}>
                           Register
                        </Button>
                     </>
                  )}
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default NavBar;
