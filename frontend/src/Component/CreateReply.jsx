import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Form } from "react-bootstrap";
import { sendReply } from "../API/API";
import DialogTitle from "@mui/material/DialogTitle";

export default function CreateMessage(props) {
   const [open, setOpen] = React.useState(false);
   const [reply, setReply] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };

   const createMessage = async () => {
      await sendReply(props.message.id, reply);
      await props.refresh();
      handleClose();
   };

   const handleClose = () => {
      setReply("");
      setOpen(false);
   };

   return (
      <div>
         <Button variant="contained" onClick={handleClickOpen}>
            Create Reply
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Create a new reply"}</DialogTitle>
            <DialogContent>
               <Form.Group className="mb-3">
                  <Form.Control
                     style={{ width: "30vw" }}
                     as="textarea"
                     rows={7}
                     onChange={(evt) => setReply(evt.target.value)}
                  />
               </Form.Group>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Close</Button>
               <Button onClick={createMessage} autoFocus>
                  Send Reply
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
