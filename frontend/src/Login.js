import React from 'react';
import './Login.css';
import {Container, Grid, Form, Button, Divider, Transition} from 'semantic-ui-react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1
    };
  }

  toggleMode = () => {
    this.setState((prev) => ({mode: prev.mode - 2}));
    setTimeout(() => this.setState((prev) => ({mode: 1 - prev.mode})), 550);
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if(this.state.mode <= 0) return;
    const r = await axios.post('localhost:5000/' + (this.state.mode == 1 ? 'login' : 'register'), {
      name: this.state.username,
      passwd: this.state.passwd
    });
    console.log(r.data);
  }

  render() {
    return (
      <div className='loginRoot'>
        <Container className="loginPanel">
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <Transition visible={this.state.mode > 0}
                          animation='scale'
                          duration={500}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    size='big'
                    name='username'
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    size='big'
                    name='passwd'
                    onChange={this.handleChange}
                  />
                  <Button primary size='big'>
                    {this.state.mode == -1 || this.state.mode == 1 ? 'Sign in' : 'Sign up'}
                  </Button>
                </Form>
              </Transition>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Transition visible={this.state.mode > 0}
                          animation='scale'
                          duration={500}>
                <Button size='big' 
                        content={this.state.mode == -1 || this.state.mode == 1 ? 'Sign up' : 'Sign in'}
                        icon='signup' color='google plus'
                        onClick={this.toggleMode} />
              </Transition> 
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Container>
      </div>
    )
  }
}

export default Login;
