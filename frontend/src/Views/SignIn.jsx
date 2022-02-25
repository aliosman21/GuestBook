import { useState, React } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { login } from "../API/API";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/SignIn.module.css";
import { TokenSlice } from "../Redux/TokenSlice";
import { useDispatch } from "react-redux";


export default function SignIn() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = async (event) => {
      event.preventDefault();
      const data = await login({ email, password });
      dispatch(TokenSlice.actions.setToken(data.token));
      navigate("/users");
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
                  <Button variant="primary" type="submit" onClick={handleLogin}>
                     login
                  </Button>
               </Form>
            </Col>
         </Card.Body>
      </Card>
   );
}
