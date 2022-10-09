import axios from "axios";
import React, { useState } from "react";
import { Col, Row, Button, Form, Container } from 'react-bootstrap';

/* login component, used for authentication
*/
export function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        props.onLogin(username, password)
    }

    return (
        <Container>
            <Form>
                <Row md="auto" className="justify-content-md-center">
                    <Col>
                        <Form.Control type="username" placeholder="username" name="username" onChange={(event) => { setUsername(event.target.value) }} />
                    </Col>
                    <Col>
                        <Form.Control type="password" placeholder="password" name="password" onChange={(event) => { setPassword(event.target.value) }} />
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={() => submit()}>
                            Login
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )


}
