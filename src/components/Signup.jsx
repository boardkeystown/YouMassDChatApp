import { React, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';

import "./Accounts.css"

const DEPLOY_MODE = (process.env.REACT_APP_DEPLOY_MODE === 'true') ? true : false;
const API_URL = (DEPLOY_MODE === true) ?
    process.env.REACT_APP_DEPLOY_API_URL :
    process.env.REACT_APP_DEV_API_URL;

export default function Signup() {
    const STATUS = {
        NONE: 0,
        BAD: 1,
        GOOD: 2
    };
    const [username, setUsername] = useState('');
    const [jannyPassword, setJannyPassword] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(0);
    const [serverResponse, setServerResponse] = useState(STATUS.NONE);

    function mkAlert() {
        if (show > STATUS.NONE) {
            let vcolor = (show === STATUS.BAD) ? "danger" : "success";
            let header_text = (show === STATUS.BAD) ? "Oh snap! You got an error!" :
                "Get Cleaning!";
            let body_text = (show === STATUS.BAD) ? "Account Creation Failed!" :
                "Account Created!";
            return (
                <Alert variant={vcolor} onClose={() => setShow(STATUS.NONE)} dismissible>
                    <Alert.Heading>{header_text}</Alert.Heading>
                    <p>
                        {body_text}<br />
                        Server Response: {serverResponse}
                    </p>
                </Alert>
            );
        } else {
            return (
                <div></div>
            );
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic with username and password
        // console.log('Username:', username);
        // console.log('Username:', jannyPassword);
        // console.log('Password:', password);
        fetch(API_URL + "/api/janny_create_account", {
            method: 'POST',
            body: JSON.stringify({
                name: username,
                password: password,
                auth_pass: jannyPassword
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json()
                        .then(errorData => {
                            setServerResponse(errorData.message)
                            // console.error(`Server responded with status ${response.status}:`, errorData);
                            throw new Error(`Server responded with status ${response.status}`);
                        });
                } else {
                    return response.json()
                }
            })
            .then(data => {
                setShow(STATUS.GOOD);
                setServerResponse(data.message)
            })
            .catch(error => {
                // failed
                setShow(STATUS.BAD);

            });
        // Reset form fields
        setUsername('');
        setJannyPassword('');
        setPassword('');
    };

    return (
        <Container>
            <div className='signup_main'>
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="jannypassword">
                            <Form.Label>Janny Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={jannyPassword}
                                onChange={(e) => setJannyPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div style={{ textAlign: "center", padding:"0.5rem" }}>
                            <Button
                                variant="primary"
                                type="submit"
                                className="ml-auto w-50 "
                            >
                                Create Account
                            </Button>
                        </div>
                    </Form>
                </div>
                <div>
                    {mkAlert()}
                </div>
            </div>
        </Container>
    )
}