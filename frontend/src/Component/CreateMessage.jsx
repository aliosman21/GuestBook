import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Form } from "react-bootstrap";
import { sendMessage } from "../API/API";
import DialogTitle from "@mui/material/DialogTitle";

export default function CreateMessage(props) {
   const [open, setOpen] = React.useState(false);
   const [message, setMessage] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };


   const createMessage = async() => {
    await sendMessage(props.user.id, message);
    await props.refresh();
    handleClose();
   };


   const handleClose = () => {
      setMessage("");
      setOpen(false);
   };

   return (
      <div>
         <Button variant="contained" onClick={handleClickOpen}>
            Create Message
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Create a new message"}</DialogTitle>
            <DialogContent>
               <Form.Group className="mb-3">
                  <Form.Control
                     style={{ width: "30vw" }}
                     as="textarea"
                     rows={7}
                     onChange={(evt) => setMessage(evt.target.value)}
                  />
               </Form.Group>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Close</Button>
               <Button onClick={createMessage} autoFocus>
                  Send Message
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
