import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMessages, deleteMessage } from "../API/API";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CreateMessage from "../Component/CreateMessage";
import EditMessage from "../Component/EditMessage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Messages() {
   const [messages, setMessages] = useState([]);
   const [count, setCount] = useState(0);
   const [page, setPage] = useState(0);
   const { state } = useLocation();
   const navigate = useNavigate();
   const userId = useSelector((state) => state.tokenStore.id);

   const paginate = async (event, value) => {
      setPage(value);
      await findMessages(25, page - 1);
   };

   const findMessages = async (limit=25, offset=0) => {
      const data = await getMessages(limit, offset, state.id);
      setCount(data.count);
      setMessages(data.rows);
   };

   const viewMessage = (message) => {
      navigate("/message", { state: message });
   };

   const removeMessage = async (message) => {
      await deleteMessage(message.id);
      await findMessages(25, 0);
   };

   useEffect(() => {
      async function fetchData() {
         await findMessages(25, page);
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
            <Avatar
               title={state.name}
               style={{ marginBottom: "4%" }}
               alt={state.name}
               src={`https://avatars.dicebear.com/api/identicon/${state.avatar}.svg`}
            />
            <CreateMessage user={state} refresh={findMessages} />
            {messages &&
               messages.map((message, index) => (
                  <Grid item key={index}>
                     <Paper
                        elevation={4}
                        style={{
                           display: "flex",
                           alignItems: "center",
                           height: "10vh",
                           width: "80vw",
                        }}>
                        <Avatar
                           title={message.fromUser.name}
                           alt={message.fromUser.name}
                           src={`https://avatars.dicebear.com/api/identicon/${message.fromUser.avatar}.svg`}
                        />
                        <div style={{ marginLeft: "5%" }}>{message.content}</div>
                        <div style={{ marginLeft: "auto", marginRight: "2%", display: "flex" }}>
                           {userId === message.fromUser.id && (
                              <Button
                                 variant="contained"
                                 color="error"
                                 onClick={() => removeMessage(message)}>
                                 Delete
                              </Button>
                           )}
                           {userId === message.fromUser.id && (
                              <EditMessage user={state} message={message} refresh={findMessages} />
                           )}
                           <Button variant="contained" onClick={() => viewMessage(message)}>
                              Replies
                           </Button>
                        </div>
                     </Paper>
                  </Grid>
               ))}
         </Grid>
         <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
            <Pagination count={Math.floor(count / 25)} page={page} onChange={paginate} />
         </div>
      </Box>
   );
}
