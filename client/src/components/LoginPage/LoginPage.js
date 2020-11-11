import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import { Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import './LoginPage.css';
import PulseLoader from 'react-spinners/PulseLoader';

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMessage] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const emailChangeHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const userInfo = {
      email,
      password
    };

    dispatch(loginUser(userInfo)).then((response) => {
      if (response.payload.success) {
        setEmail('');
        setPassword('');
        setEmailErrorMsg('');
        setPasswordErrorMessage('');
        setIsLoading(false);
        window.location.href = '/';
      } else {
        if (response.payload.emailErrorMsg) {
          setIsLoading(false);
          setEmail('');
          setEmailErrorMsg(response.payload.emailErrorMsg);
        } else {
          setIsLoading(false);
          setPassword('');
          setPasswordErrorMessage(response.payload.passwordErrorMsg);
        }
      }
    });
  };

  return (
    <div className='container'>
      <h1 style={{ marginBottom: '48px' }}>Log In</h1>
      {isLoading ? (
        <PulseLoader size={25} color={'#0000FF'} />
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for='email'>Email</Label>
            {emailErrorMsg && (
              <h5 style={{ color: 'red' }}>* {emailErrorMsg} *</h5>
            )}
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
            {passwordErrorMsg && (
              <h5 style={{ color: 'red' }}>* {passwordErrorMsg} *</h5>
            )}
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
            color='primary'
            size='lg'
            onClick={handleSubmit}>
            Log me in!
          </Button>
          <br />
          <Button style={{ marginTop: '24px' }} color='warning'>
            <NavLink href='/register' style={{ color: 'black' }}>
              Create an account
            </NavLink>
          </Button>
        </Form>
      )}
    </div>
  );
};

export default LoginPage;
