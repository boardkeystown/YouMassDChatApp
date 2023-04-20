import { React, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, Container } from 'react-bootstrap';

import "./Accounts.css"

const DEPLOY_MODE = (process.env.REACT_APP_DEPLOY_MODE === 'true') ? true : false;
const API_URL = (DEPLOY_MODE === true) ?
  process.env.REACT_APP_DEPLOY_API_URL :
  process.env.REACT_APP_DEV_API_URL;

export default function Login({ updateSessionFunc }) {
  const STATUS = {
    NONE: 0,
    BAD: 1,
    GOOD: 2
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(0);
  const [serverResponse, setServerResponse] = useState(STATUS.NONE);



  function mkAlert() {
    if (show > STATUS.NONE) {
      let vcolor = (show === STATUS.BAD) ? "danger" : "success";
      let header_text = (show === STATUS.BAD) ? "Oh snap! You got an error!" :
        "Get Cleaning!";
      let body_text = (show === STATUS.BAD) ? "Login Failed!" :
        "Login Success!";
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
    // console.log('Username:', username);
    // console.log('Password:', password);

    fetch(API_URL + "/api/janny_login", {
      method: 'POST',
      body: JSON.stringify({
        name: username,
        password: password
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            setServerResponse(errorData.message)
            throw new Error(`Server responded with status ${response.status}`);
          });
        } else {
          return response.json()
        }
      })
      .then(data => {
        setShow(STATUS.GOOD);
        setServerResponse(data.message)
        updateSessionFunc({ accessToken: data.accessToken, username: username })
      })
      .catch(errpr => {
        setShow(STATUS.BAD);
      });
    // Reset form fields
    setUsername('');
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
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div style={{ textAlign: "center", padding:"0.5rem"}}>
              <Button 
                variant="primary" 
                type="submit"
                className="ml-auto w-50"
                >
                Login
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
