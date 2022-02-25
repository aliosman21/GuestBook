import React, { useState ,useEffect} from "react";
import Snackbar from "@mui/material/Snackbar";
import { store } from "../Redux/Store";
export default function BasicAlerts() {
   const [visible, setVisible] = useState(false);
   const state = store.getState();
   useEffect(() => {
      store.subscribe(() => {
         setVisible(state.AlertStore.isVisible);
      });
      if (visible){
         console.log("inside");
         setTimeout(() => {
            setVisible(false);
         }, 2000);
      }
   }, [visible]);
   return (
            <Snackbar open={visible} autoHideDuration={2000} message={state.AlertStore.Message} />
   );
}
