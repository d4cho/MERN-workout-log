import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap';
import './RegisterPage.css';

const RegisterPage = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const usernameChangeHandler = (e) => {
    setUsername(e.currentTarget.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const handleSubmit = () => {
    console.log('submitted!');
  };

  return (
    <div className='container'>
      <h1 style={{ marginBottom: '48px' }}>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for='username'>Username</Label>
          <Input
            type='name'
            name='username'
            id='username'
            placeholder='Username'
            value={username}
            onChange={usernameChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='example@example.com'
            value={email}
            onChange={emailChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            valid={password.length >= 6 && true}
            onChange={passwordChangeHandler}
          />
          <FormText>Password must be at least 6 characters</FormText>
        </FormGroup>
        <FormGroup>
          <Label for='confirmPassword'>Confirm password</Label>
          <Input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Confirm password'
            value={confirmPassword}
            invalid={
              confirmPassword && password !== confirmPassword ? true : false
            }
            valid={
              confirmPassword && password === confirmPassword ? true : false
            }
            onChange={confirmPasswordChangeHandler}
          />
          <FormFeedback>Password does not match!</FormFeedback>
        </FormGroup>
        {username && email && password && confirmPassword === password ? (
          <Button
            style={{ marginTop: '24px' }}
            color='success'
            onClick={handleSubmit}>
            Register!
          </Button>
        ) : (
          <Button style={{ marginTop: '24px' }} disabled>
            Fill in all fields to register!
          </Button>
        )}
      </Form>
    </div>
  );
};

export default RegisterPage;
