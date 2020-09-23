import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap';
import './LoginPage.css';

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChangeHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = () => {
    console.log('submitted!');

    const userInfo = {
      email,
      password
    };

    dispatch(loginUser(userInfo)).then((response) => {
      if (response.payload.success) {
        setEmail('');
        setPassword('');

        props.history.push('/');
      }
    });
  };

  return (
    <div className='container'>
      <h1 style={{ marginBottom: '48px' }}>Log In</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input
            type='email'
            name='email'
            id='email'
            bsSize='lg'
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
            bsSize='lg'
            value={password}
            onChange={passwordChangeHandler}
          />
        </FormGroup>
        <Button
          style={{ marginTop: '24px' }}
          color='success'
          onClick={handleSubmit}>
          Log me in!
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
