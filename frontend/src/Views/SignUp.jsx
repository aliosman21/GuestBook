import { useState, React } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { createUser } from "../API/API";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/SignIn.module.css";

export default function SignIn() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const navigate = useNavigate();

   const handleRegister = async (event) => {
      event.preventDefault();
      const data = await createUser({ name, email, password });
      if (data){
        navigate("/");
      }
   };
   const goToLogin = async () => {
      navigate("/");
   };
   return (
      <Card className={styles.middle} style={{ width: "30vw" }}>
         <Card.Body>
            <Card.Title style={{ marginLeft: "40%" }}>Sign Up</Card.Title>
            <Col>
               <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                     <Form.Label>Name</Form.Label>
                     <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(evt) => setName(evt.target.value)}
                     />
                  </Form.Group>
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
                  <div style={{display: "flex", justifyContent:"space-between"}}>
                  <Button variant="primary" type="submit" onClick={handleRegister}>
                     Register
                  </Button>
                  <Button variant="primary" type="submit" color="green" onClick={goToLogin}>
                     Go to Login
                  </Button>
                  </div>
               </Form>
            </Col>
         </Card.Body>
      </Card>
   );
}
