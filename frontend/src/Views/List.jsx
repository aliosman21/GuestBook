import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { getUsers } from "../API/API";
import { useNavigate } from "react-router-dom";
export default function List() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();


  const paginate = async(event, value) => {
    setPage(value);
    await findUsers(25, page === 0 ? page : page - 1);
  }
  const findUsers = async(limit, offset) => {
    const data = await getUsers(limit, offset);
    setCount(data.count);
    setUsers(data.rows);
  }
  const viewProfile = (user) => {
    navigate("/messages", { state: user });
  }
  useEffect(() => {
     async function fetchData() {
        await findUsers(25, page);
     }
     fetchData();
  }, []);
  return (
     <Box sx={{ flexGrow: 1 }} style={{ paddingLeft: "1%", paddingRight: "1%" }}>
        <Grid
           container
           direction="row"
           justifyContent="center"
           alignItems="flex-start"
           spacing={{ xs: 1, md: 1 }}
           columns={{ xs: 4, sm: 8, md: 12 }}
           style={{ marginTop: "10%" }}>
           {users &&
              users.map((user, index) => (
                 <Grid item xs={2} sm={3} md={5} key={index}>
                    <Paper
                       elevation={4}
                       style={{ display: "flex", alignItems: "center", height: "10vh" }}>
                       <Avatar
                          title={user.name}
                          alt={user.name}
                          src={`https://avatars.dicebear.com/api/identicon/${user.avatar}.svg`}
                       />
                       <div style={{ marginLeft: "5%" }}>{user.name}</div>
                       <div style={{ marginLeft: "auto", marginRight: "2%" }}>
                          <Button variant="contained" onClick={() => viewProfile(user)}>
                             Profile
                          </Button>
                       </div>
                    </Paper>
                 </Grid>
              ))}
        </Grid>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
           <Pagination
              color="primary"
              count={Math.floor(count / 25)}
              page={page}
              onChange={paginate}
           />
        </div>
     </Box>
  );
}
