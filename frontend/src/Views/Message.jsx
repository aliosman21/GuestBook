import React, {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { getReplies } from '../API/API';
export default function Message() {
    const [replies, setReplies] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const { state } = useLocation();

const paginate = async (event, value) => {
   setPage(value);
   await findReplies(25, page - 1);
};

    const findReplies = async (limit = 25, offset = 0) => {
       const data = await getReplies(limit, offset, state.id);
       setCount(data.count);
       setReplies(data.rows);
    };
    useEffect(() => {
        async function fetchData() {
           await findReplies();
        }
        fetchData();
    }, []);
  return (
     <Box sx={{ flexGrow: 1 }} style={{ paddingLeft: "1%", paddingRight: "1%" }}>
        <Grid
           container
           direction="column"
           justifyContent="center"
           alignItems="center"
           spacing={{ xs: 1, md: 1 }}
           columns={{ xs: 4, sm: 8, md: 12 }}
           style={{ marginTop: "10%" }}>
           <Grid item>
              <Paper
                 elevation={4}
                 style={{
                    display: "flex",
                    alignItems: "center",
                    height: "10vh",
                    width: "80vw",
                    marginBottom: "5%",
                 }}>
                 <Avatar
                    title={state.fromUser.name}
                    alt={state.fromUser.name}
                    src={`https://avatars.dicebear.com/api/identicon/${state.fromUser.avatar}.svg`}
                 />
                 <div style={{ marginLeft: "5%" }}>{state.content}</div>
                 <div style={{ marginLeft: "auto", marginRight: "2%", display: "flex" }}></div>
              </Paper>
              {replies &&
                 replies.map((reply, index) => (
                    <Grid item key={index}>
                       <Paper
                          elevation={1}
                          style={{
                             display: "flex",
                             alignItems: "center",
                             height: "10vh",
                             width: "80vw",
                          }}>
                          <Avatar
                             title={reply.User.name}
                             alt={reply.User.name}
                             src={`https://avatars.dicebear.com/api/identicon/${reply.User.avatar}.svg`}
                          />
                          <div style={{ marginLeft: "5%" }}>{reply.content}</div>
                       </Paper>
                    </Grid>
                 ))}
           </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
           <Pagination count={Math.floor(count / 25)} page={page} onChange={paginate} />
        </div>
     </Box>
  );
}
