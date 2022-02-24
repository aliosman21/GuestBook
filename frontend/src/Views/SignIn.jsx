import {useState, React} from 'react'
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { login } from '../API/API';
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/TokenSlice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async(event) => {
        event.preventDefault();
        const data = await login({email, password});
        dispatch(setToken(data.token));
        navigate("/users");
    }
  return (
     <Container>
        <Row className="mt-5">
           <Col md={{ span: 4, offset: 4 }}>
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
        </Row>
     </Container>
  );
}
