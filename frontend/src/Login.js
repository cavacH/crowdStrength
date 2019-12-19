import React from 'react';
import './Login.css';
import {Container, Row, Col, Card, Nav, Form, Button} from 'react-bootstrap';

class Login extends React.Component {
  handleTab = (eventKey) => {
    //alert(eventKey)
  }
  render() {
    return (
      <div className="loginContainer">
        <Card style={{width: '25rem'}}>
          <Card.Header>
            <Nav variant="pills" defaultActiveKey="tabLogin" onSelect={this.handleTab}>
              <Nav.Item>
                <Nav.Link eventKey="tabLogin">Sign In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tabRegister">Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>     
            <Form>
              <Form.Group controlId="username" bssize="large">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your user ID"/>
              </Form.Group>
              <Form.Group controlId="password" bssize="large">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
              </Form.Group>
              <Button variant="primary" type="submit" bssize="large">
                Submit
              </Button>
            </Form> 
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Login;
