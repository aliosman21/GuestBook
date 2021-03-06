import { useState, React } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { login } from "../API/API";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/SignIn.module.css";
import { TokenSlice, AlertSlice } from "../Redux/TokenSlice";
import { useDispatch } from "react-redux";


export default function SignIn() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = async (event) => {
      event.preventDefault();
      const data = await login({ email, password });
      if (data){
         dispatch(TokenSlice.actions.setToken(data.token));
         dispatch(TokenSlice.actions.setId(data.id));
         navigate("/users");
      } else {
         dispatch(AlertSlice.actions.setAlertInfo({visible: true, message:"Failed to login"}));
      }
   };
   const goToRegister = async () => {
      navigate("/register");
   };
   return (
      <Card className={styles.middle} style={{ width: "30vw" }}>
         <Card.Body>
            <Card.Title style={{ marginLeft: "40%" }}>Sign In</Card.Title>
            <Col>
               <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                     />
                  </Form.Group>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                     <Button variant="primary" type="submit" onClick={handleLogin}>
                        login
                     </Button>
                     <Button variant="primary" type="submit" onClick={goToRegister}>
                        Go to Register
                     </Button>
                  </div>
               </Form>
            </Col>
         </Card.Body>
      </Card>
   );
}
