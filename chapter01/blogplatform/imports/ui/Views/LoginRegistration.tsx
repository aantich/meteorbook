import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type FormData = {
  login: string;
  password: string;
};

export const LoginRegistration: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormData>({ login: '', password: '' });

  const validateForm = () => {
    let formErrors = { login: '', password: '' };
    if (!login) formErrors.login = "Login is required";
    if (!password || password.length < 6) formErrors.password = "Password must have at least 6 characters";
    setErrors(formErrors);

    // return true if no errors
    return Object.values(formErrors).every(x => !x);
  };

  const handleSubmit = (registration: boolean) => {
    
    if (validateForm()) {
      //console.log({ login, password, registration });
      if (registration) {
        Accounts.createUser({
            email: login,
            username: login,
            password: password
        }, (err)=> {
            console.log(err)
        })
      }
      else {
          Meteor.loginWithPassword(login,password,(err)=> {
            console.log(err);
          })
      }
    }
  };

  return (
      <>
      {Meteor.userId() && 
      <h3>Welcome, {Meteor.user()?.username}</h3>}
    <Form>
      <Form.Group controlId="formLogin">
        <Form.Label>Login:</Form.Label>
        <Form.Control
          type="text"
          value={login}
          isInvalid={!!errors.login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.login}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          isInvalid={!!errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" onClick={()=>handleSubmit(true)}>
        Register
      </Button>
      <Button variant="primary" onClick={()=>handleSubmit(false)}>
        Login
      </Button>
    </Form>
    </>
  );
}
