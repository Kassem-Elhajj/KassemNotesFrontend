import React, { useContext, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import { Link, Navigate } from 'react-router-dom'; // Import React Router's Link component
import { UserContext } from '../userContext';

function Login() {

  const {UserInfo} = useContext(UserContext)
  const username = UserInfo?.username

  const [navigation, setNavigation] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://kassemnotes.onrender.com/auth/login',
      formData,
      headers: { "Content-Type": "application/json" },
      {withCredentials: true}
    ).then(res => {

      if(res.data.status !== 'ok'){
        alert(res.data.message)
      }else{
        setNavigation(true)
      }
      
    }).catch(err => {
      console.log(err.message)
    })
    
  };

  if(navigation){
    window.location.assign('https://kassemnotesfrontend.onrender.com')
  }

  if(username){
    return <Navigate to = {'*'} />
  }

  return (
    <Container className="mt-5 text-white">
      <h2 className="text-white text-center">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-center mt-3">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>

        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <Link to="/register">Sign up here</Link>
        </p>
      </Form>
    </Container>
  );
}

export default Login;
